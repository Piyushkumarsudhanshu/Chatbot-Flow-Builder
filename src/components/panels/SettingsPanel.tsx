import { ArrowLeft } from 'lucide-react';
import { useFlowStore } from '@/store/useFlowStore';

/** Settings panel shown when a node is selected — allows editing node text */
export function SettingsPanel() {
  const { nodes, selectedNodeId, updateNodeText, setSelectedNode } =
    useFlowStore();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) return null;

  const text = (selectedNode.data as { text: string }).text ?? '';

  return (
    <div className="flex flex-col gap-4">
      {/* Back button */}
      <button
        onClick={() => setSelectedNode(null)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to nodes
      </button>

      <div>
        <h3 className="text-sm font-semibold text-panel-header mb-1">
          Message Settings
        </h3>
        <p className="text-xs text-muted-foreground">
          Edit the text content of this message node
        </p>
      </div>

      {/* Text editor */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="node-text"
          className="text-xs font-medium text-muted-foreground"
        >
          Message Text
        </label>
        <textarea
          id="node-text"
          value={text}
          onChange={(e) => updateNodeText(selectedNode.id, e.target.value)}
          placeholder="Enter your message..."
          rows={4}
          className="
            w-full rounded-md border border-input bg-card px-3 py-2
            text-sm text-foreground placeholder:text-muted-foreground
            focus:outline-none focus:ring-2 focus:ring-ring
            resize-none
          "
        />
      </div>

      <div className="text-xs text-muted-foreground">
        Node ID: <code className="text-foreground">{selectedNode.id}</code>
      </div>
    </div>
  );
}
