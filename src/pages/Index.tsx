import { ReactFlowProvider } from '@xyflow/react';
import { FlowBuilder } from '@/components/flow/FlowBuilder';
import { PanelWrapper } from '@/components/panels/PanelWrapper';
import { useFlowStore } from '@/store/useFlowStore';
import { Save, Workflow } from 'lucide-react';
import { toast } from 'sonner';

/** Top toolbar with branding and save button */
function Toolbar() {
  const saveFlow = useFlowStore((s) => s.saveFlow);

  const handleSave = () => {
    const result = saveFlow();
    if (result.isValid) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-2.5 bg-toolbar border-b border-toolbar-border">
      <div className="flex items-center gap-2">
        <Workflow className="w-5 h-5 text-primary" />
        <h1 className="text-sm font-bold tracking-tight text-foreground">
          Chatbot Flow Builder
        </h1>
      </div>
      <button
        onClick={handleSave}
        className="
          flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium
          bg-primary text-primary-foreground
          hover:bg-primary/90 active:scale-[0.97]
          transition-all duration-150
        "
      >
        <Save className="w-4 h-4" />
        Save Changes
      </button>
    </header>
  );
}

export default function Index() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <ReactFlowProvider>
        <Toolbar />
        <div className="flex flex-1 overflow-hidden">
          <FlowBuilder />
          <PanelWrapper />
        </div>
      </ReactFlowProvider>
    </div>
  );
}
