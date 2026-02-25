import { create } from 'zustand';
import {
  type Node,
  type Edge,
  type Connection,
  type OnNodesChange,
  type OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import type { TextNodeData } from '@/types/node.types';
import type { FlowData } from '@/types/flow.types';
import { validateFlow } from '@/utils/validation';

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;

  // Node operations
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  addNode: (type: string, position: { x: number; y: number }) => void;
  updateNodeText: (nodeId: string, text: string) => void;
  setSelectedNode: (nodeId: string | null) => void;

  // Edge operations
  onConnect: (connection: Connection) => void;

  // Flow operations
  saveFlow: () => { isValid: boolean; message: string };
}

let nodeIdCounter = 0;
const generateNodeId = () => `node_${++nodeIdCounter}`;

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  /** Add a new node at the given canvas position */
  addNode: (type, position) => {
    const newNode: Node = {
      id: generateNodeId(),
      type,
      position,
      data: { text: 'Text message' } satisfies TextNodeData,
    };
    set({ nodes: [...get().nodes, newNode] });
  },

  /** Update the text content of a specific node */
  updateNodeText: (nodeId, text) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, text } }
          : node
      ),
    });
  },

  setSelectedNode: (nodeId) => {
    set({ selectedNodeId: nodeId });
  },

  /**
   * Handle new connections with source-handle uniqueness enforcement.
   * A source handle can only have ONE outgoing edge.
   */
  onConnect: (connection) => {
    const { edges } = get();

    // Check if this source handle already has an outgoing edge
    const sourceAlreadyConnected = edges.some(
      (edge) =>
        edge.source === connection.source &&
        edge.sourceHandle === connection.sourceHandle
    );

    if (sourceAlreadyConnected) return; // Block duplicate source connections

    const newEdge: Edge = {
      id: `edge_${connection.source}_${connection.target}`,
      source: connection.source!,
      target: connection.target!,
      sourceHandle: connection.sourceHandle,
      targetHandle: connection.targetHandle,
      animated: true,
    };

    set({ edges: [...edges, newEdge] });
  },

  /** Validate and save the current flow */
  saveFlow: () => {
    const { nodes, edges } = get();
    const result = validateFlow(nodes, edges);

    if (result.isValid) {
      const flowData: FlowData = {
        nodes: nodes.map((n) => ({
          id: n.id,
          type: n.type ?? 'default',
          position: n.position,
          data: n.data as Record<string, unknown>,
        })),
        edges: edges.map((e) => ({
          id: e.id,
          source: e.source,
          target: e.target,
        })),
      };
      console.log('💾 Flow saved:', JSON.stringify(flowData, null, 2));
    }

    return result;
  },
}));
