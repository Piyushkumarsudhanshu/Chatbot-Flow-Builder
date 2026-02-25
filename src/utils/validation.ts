import type { Node, Edge } from '@xyflow/react';
import type { ValidationResult } from '@/types/flow.types';

/**
 * Validates the chatbot flow.
 *
 * Rules:
 * 1. If there's 0 or 1 node → always valid
 * 2. Find all nodes that have NO incoming edges (no edge targets them)
 * 3. If more than one such "disconnected" node exists → invalid
 */
export function validateFlow(nodes: Node[], edges: Edge[]): ValidationResult {
  // Single node or empty canvas is always valid
  if (nodes.length <= 1) {
    return { isValid: true, message: 'Flow is valid!' };
  }

  // Collect all node IDs that are targeted by at least one edge
  const nodesWithIncoming = new Set(edges.map((edge) => edge.target));

  // Find nodes with no incoming edges
  const disconnectedNodes = nodes.filter(
    (node) => !nodesWithIncoming.has(node.id)
  );

  if (disconnectedNodes.length > 1) {
    return {
      isValid: false,
      message: `Cannot save: ${disconnectedNodes.length} nodes have no incoming connections. Connect all nodes to form a single flow.`,
    };
  }

  return { isValid: true, message: 'Flow saved successfully!' };
}
