import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const ReplyPreview = () => {
  const { replyingToMessage, setReplyingToMessage } = useChatStore();

  if (!replyingToMessage) return null;

  return (
    <div className="px-4 py-2 bg-base-200 border-l-4 border-primary flex items-center justify-between gap-2">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-zinc-400">Replying to message</p>
        <p className="text-sm truncate">
          {replyingToMessage.text || "[Image/File]"}
        </p>
      </div>
      <button
        onClick={() => setReplyingToMessage(null)}
        className="btn btn-sm btn-ghost"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default ReplyPreview;
