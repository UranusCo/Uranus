import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const ReplyPreview = () => {
  const { replyingToMessage, setReplyingToMessage } = useChatStore();

  if (!replyingToMessage) return null;

  return (
    <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800/80 border-l-4 border-blue-500 dark:border-blue-400 flex items-center justify-between gap-2 rounded-t-xl transition-colors duration-200">
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">Replying to message</p>
        <p className="text-sm truncate text-slate-700 dark:text-slate-200">
          {replyingToMessage.text || "[Image/File]"}
        </p>
      </div>
      <button
        onClick={() => setReplyingToMessage(null)}
        className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
      >
        <X size={15} />
      </button>
    </div>
  );
};

export default ReplyPreview;
