import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const EditingIndicator = () => {
  const { editingMessageId, messages, setEditingMessage } = useChatStore();

  if (!editingMessageId) return null;

  const editingMessage = messages.find((m) => m._id === editingMessageId);

  if (!editingMessage) return null;

  return (
    <div className="bg-info/10 border-l-4 border-info p-3 mb-2 flex items-center justify-between rounded">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-info font-medium text-sm flex-shrink-0">Editing:</span>
        <p className="text-sm text-base-content/70 truncate">{editingMessage.text}</p>
      </div>
      <button
        onClick={() => setEditingMessage(null)}
        className="btn btn-ghost btn-xs flex-shrink-0"
        title="Cancel edit"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default EditingIndicator;
