import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const MessageReactions = ({ message }) => {
  const { authUser } = useAuthStore();
  const { addReaction, removeReaction } = useChatStore();

  if (!message || !message.reactions || typeof message.reactions !== 'object') {
    return null;
  }

  const reactionsKeys = Object.keys(message.reactions);
  if (reactionsKeys.length === 0) {
    return null;
  }

  const handleReactionClick = (emoji) => {
    try {
      const hasReaction = message.reactions[emoji]?.includes(authUser._id);
      if (hasReaction) {
        removeReaction(message._id, emoji);
      } else {
        addReaction(message._id, emoji);
      }
    } catch (error) {
      console.error("Error handling reaction:", error);
      // Optionally show a toast or handle the error
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full px-1.5 py-0.5 shadow-sm border border-slate-200/40 dark:border-slate-700/40">
      {reactionsKeys.map((emoji) => {
        try {
          const users = message.reactions[emoji];
          if (!Array.isArray(users)) return null;

          const hasReaction = users?.includes(authUser._id);
          return (
            <button
              key={emoji}
              onClick={() => handleReactionClick(emoji)}
              className={`px-1.5 py-0.5 rounded-full text-sm flex items-center gap-0.5 transition-all active:scale-90 ${
                hasReaction
                  ? "bg-blue-100 dark:bg-blue-900/40 shadow-sm"
                  : "hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
              title={users?.map(id => id.substring(0, 4)).join(", ")}
            >
              <span className="text-sm">{emoji}</span>
              {users && users.length > 0 && (
                <span className={`text-[10px] font-bold ${hasReaction ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"}`}>
                  {users.length > 1 ? users.length : ""}
                </span>
              )}
            </button>
          );
        } catch (error) {
          console.error("Error rendering reaction:", emoji, error);
          return null;
        }
      })}
    </div>
  );
};

export default MessageReactions;
