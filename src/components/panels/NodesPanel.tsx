import { type DragEvent } from 'react';
import { MessageSquare } from 'lucide-react';
import type { NodeTypeConfig } from '@/types/node.types';

/**
 * Extensible config array — add new node types here.
 * The panel renders dynamically from this list.
 */
const availableNodes: NodeTypeConfig[] = [
  {
    type: 'message',
    label: 'Message',
    icon: '💬',
    description: 'Send a text message to the user',
  },
];

/** Right-side panel showing draggable node types */
export function NodesPanel() {
  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="text-sm font-semibold text-panel-header mb-1">Nodes</h3>
        <p className="text-xs text-muted-foreground">
          Drag a node onto the canvas to add it
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {availableNodes.map((nodeConfig) => (
          <div
            key={nodeConfig.type}
            draggable
            onDragStart={(e) => onDragStart(e, nodeConfig.type)}
            className="
              flex items-center gap-3 p-3 rounded-lg border border-border
              bg-secondary cursor-grab active:cursor-grabbing
              hover:border-primary hover:shadow-sm
              transition-all duration-150
            "
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-md bg-primary/10">
              <MessageSquare className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {nodeConfig.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {nodeConfig.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
