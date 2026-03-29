import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const MessageReactions = ({ message, onReactionClick }) => {
  if (!message.reactions || Object.keys(message.reactions).length === 0) {
    return null;
  }

  const { authUser } = useAuthStore();
  const { addReaction, removeReaction } = useChatStore();

  const handleReactionClick = (emoji) => {
    const hasReaction = message.reactions[emoji]?.includes(authUser._id);
    if (hasReaction) {
      removeReaction(message._id, emoji);
    } else {
      addReaction(message._id, emoji);
    }
  };

  return (
    <div className="mt-2 flex flex-wrap items-center gap-1">
      {Object.entries(message.reactions).map(([emoji, users]) => {
        const hasReaction = users?.includes(authUser._id);
        return (
          <button
            key={emoji}
            onClick={() => handleReactionClick(emoji)}
            className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 transition-colors
              ${
                hasReaction
                  ? "bg-primary text-primary-content"
                  : "bg-base-200 hover:bg-base-300"
              }
            `}
            title={users?.map(id => id.substring(0, 4)).join(", ")}
          >
            {emoji}
            {users && users.length > 0 && (
              <span className="text-xs">{users.length > 1 ? users.length : ""}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default MessageReactions;
