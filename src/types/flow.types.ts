/** Result of flow validation */
export interface ValidationResult {
  isValid: boolean;
  message: string;
}

/** Serialized flow structure for saving */
export interface FlowData {
  nodes: Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
    data: Record<string, unknown>;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
  }>;
}
