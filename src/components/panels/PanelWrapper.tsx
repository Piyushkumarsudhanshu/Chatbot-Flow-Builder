import { useFlowStore } from '@/store/useFlowStore';
import { NodesPanel } from './NodesPanel';
import { SettingsPanel } from './SettingsPanel';

/**
 * Right-side panel container.
 * Switches between NodesPanel and SettingsPanel based on node selection.
 */
export function PanelWrapper() {
  const selectedNodeId = useFlowStore((s) => s.selectedNodeId);

  return (
    <aside className="w-[280px] h-full bg-panel border-l border-panel-border p-4 overflow-y-auto">
      {selectedNodeId ? <SettingsPanel /> : <NodesPanel />}
    </aside>
  );
}
