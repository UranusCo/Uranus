import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const EditingIndicator = () => {
  const { editingMessageId, messages, setEditingMessage } = useChatStore();

  if (!editingMessageId) return null;

  const editingMessage = messages.find((m) => m._id === editingMessageId);

  if (!editingMessage) return null;

  return (
    <div className="bg-blue-500/5 dark:bg-blue-400/5 border-l-4 border-blue-500 dark:border-blue-400 p-3 mb-2 flex items-center justify-between rounded-xl transition-colors duration-200">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider flex-shrink-0">Editing:</span>
        <p className="text-sm text-slate-600 dark:text-slate-300 truncate">{editingMessage.text}</p>
      </div>
      <button
        onClick={() => setEditingMessage(null)}
        className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors flex-shrink-0"
        title="Cancel edit"
      >
        <X size={15} />
      </button>
    </div>
  );
};

export default EditingIndicator;
