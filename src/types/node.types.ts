import { type Node } from '@xyflow/react';

/** Data payload for a text/message node */
export interface TextNodeData extends Record<string, unknown> {
  text: string;
}

/** Custom node with typed data */
export type TextNode = Node<TextNodeData, 'message'>;

/** Union of all custom node types — extend as new node types are added */
export type AppNode = TextNode;

/** Configuration for a draggable node type in the panel */
export interface NodeTypeConfig {
  type: string;
  label: string;
  icon: string; // emoji or icon name
  description: string;
}
