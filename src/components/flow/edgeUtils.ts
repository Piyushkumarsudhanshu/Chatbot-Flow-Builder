import type { Edge } from '@xyflow/react';

/**
 * Check if a source handle already has an outgoing edge.
 * Used to enforce single-outgoing-edge rule per source handle.
 */
export function hasOutgoingEdge(
  edges: Edge[],
  sourceId: string,
  sourceHandle?: string | null
): boolean {
  return edges.some(
    (edge) =>
      edge.source === sourceId &&
      edge.sourceHandle === (sourceHandle ?? null)
  );
}
