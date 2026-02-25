import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { MessageSquare } from 'lucide-react';
import type { TextNodeData } from '@/types/node.types';

/**
 * Custom message node rendered on the canvas.
 * Shows a header with icon and the message text body.
 */
export const CustomNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as TextNodeData;

  return (
    <div
      className={`
        w-[220px] rounded-lg bg-node border border-node-border
        shadow-md transition-shadow duration-200
        ${selected ? 'ring-2 ring-node-selected-ring shadow-lg' : ''}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-t-lg bg-node-header text-node-header-foreground">
        <MessageSquare className="w-3.5 h-3.5" />
        <span className="text-xs font-semibold tracking-wide">Send Message</span>
      </div>

      {/* Body */}
      <div className="px-3 py-3">
        <p className="text-sm text-foreground leading-relaxed break-words">
          {nodeData.text || 'Empty message...'}
        </p>
      </div>

      {/* Target handle (left) — accepts multiple incoming edges */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-primary !border-2 !border-primary-foreground"
      />

      {/* Source handle (right) — only one outgoing edge allowed */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-primary !border-2 !border-primary-foreground"
      />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';
