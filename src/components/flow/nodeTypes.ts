import type { NodeTypes } from '@xyflow/react';
import { CustomNode } from './CustomNode';

/**
 * Registry of all custom node types.
 * Extend this object to add new node types (e.g., delay, condition).
 */
export const nodeTypes: NodeTypes = {
  message: CustomNode,
};
