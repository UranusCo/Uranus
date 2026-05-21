import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { Paperclip, Check, CheckCheck, MoreVertical } from "lucide-react";
import MessageReactions from "./MessageReactions";
import QuotedMessage from "./QuotedMessage";
import ViewOnceMedia from "./ViewOnceMedia";

const MessageItem = ({ 
  message, 
  index, 
  messagesLength, 
  messageEndRef, 
  selectedUser, 
  activeMessageMenu, 
  openMessageMenu, 
  closeMessageMenu,
  handleLongPressStart,
  handleLongPressEnd,
  addReaction,
  removeReaction,
  markViewOnceOpened
}) => {
  const { authUser } = useAuthStore();
  const isSelf = message.senderId === authUser._id;

  const handleDoubleClick = message.isDeleted ? undefined : () => {
    const hasHeart = message.reactions?.["❤️"]?.includes(authUser._id);
    if (hasHeart) {
      removeReaction(message._id, "❤️");
    } else {
      addReaction(message._id, "❤️");
    }
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    if (activeMessageMenu === message._id) {
      closeMessageMenu();
    } else {
      openMessageMenu(message._id, rect);
    }
  };

  const commonBubbleClasses = `flex flex-col select-text px-4 py-2.5 rounded-2xl border shadow-sm transition-all no-callout ${
    message.isDeleted
      ? "bg-slate-100 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 border-slate-200/80 dark:border-slate-700/80 italic font-normal"
      : isSelf
        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-transparent hover:brightness-[0.98] rounded-tr-none"
        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-750/80 border-slate-200/50 dark:border-slate-700/50 rounded-tl-none"
  } hover:cursor-pointer`;

  return (
    <div
      ref={index === messagesLength - 1 ? messageEndRef : null}
      className={`flex flex-col ${isSelf ? "items-end" : "items-start"} w-full message-item group/msg`}
      style={{
        animation: `slideIn 0.28s ease-out ${Math.min(index * 0.02, 0.4)}s both`,
      }}
    >
      {!isSelf && (
        <div className="flex gap-3 items-start w-full">
           <div className="flex-shrink-0 mt-0.5 select-none">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-10 rounded-full object-cover shadow-sm border border-slate-200 dark:border-slate-700"
            />
          </div>
          <div className="flex flex-col items-start w-full min-w-0">
             <MessageContent 
               isSelf={isSelf}
               message={message}
               selectedUser={selectedUser}
               handleDoubleClick={handleDoubleClick}
               handleLongPressStart={handleLongPressStart}
               handleLongPressEnd={handleLongPressEnd}
               handleMenuClick={handleMenuClick}
               markViewOnceOpened={markViewOnceOpened}
               commonBubbleClasses={commonBubbleClasses}
             />
          </div>
        </div>
      )}

      {isSelf && (
        <MessageContent 
          isSelf={isSelf}
          message={message}
          selectedUser={selectedUser}
          handleDoubleClick={handleDoubleClick}
          handleLongPressStart={handleLongPressStart}
          handleLongPressEnd={handleLongPressEnd}
          handleMenuClick={handleMenuClick}
          markViewOnceOpened={markViewOnceOpened}
          commonBubbleClasses={commonBubbleClasses}
        />
      )}
    </div>
  );
};

const MessageContent = ({ 
  isSelf, 
  message, 
  selectedUser, 
  handleDoubleClick, 
  handleLongPressStart, 
  handleLongPressEnd, 
  handleMenuClick,
  markViewOnceOpened,
  commonBubbleClasses
}) => {
  const { authUser } = useAuthStore();
  
  return (
    <>
      {/* Header: Sender and Time */}
      <div className={`flex items-center gap-1.5 mb-1 px-1.5 text-[11px] text-slate-400 dark:text-slate-500 select-none font-semibold ${isSelf ? "justify-end" : ""}`}>
        <span className={`${isSelf ? "text-slate-500 dark:text-slate-455" : "text-slate-600 dark:text-slate-350"} font-bold`}>
          {isSelf ? "You" : selectedUser.fullName}
        </span>
        <span>•</span>
        <time>{formatMessageTime(message.createdAt)}</time>
        {message.isPinned && <span className="ml-1 text-amber-500">📌 Pinned</span>}
      </div>

      {/* Quoted Message */}
      {message.replyTo && !message.isDeleted && (
        <div className={`mb-1.5 msg-bubble-container ${isSelf ? "text-left" : "w-full text-left"}`}>
          <QuotedMessage replyTo={message.replyTo} />
        </div>
      )}

      {/* Bubble Row */}
      <div className={`flex gap-2 items-end group/bubble w-full msg-bubble-container ${isSelf ? "justify-end" : ""}`}>
        {isSelf && !message.isDeleted && (
          <div className="opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-200 flex-shrink-0 select-none">
            <button
              className="size-6 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              onClick={handleMenuClick}
            >
              <MoreVertical size={14} />
            </button>
          </div>
        )}

        <div
          className={commonBubbleClasses}
          onDoubleClick={handleDoubleClick}
          onTouchStart={message.isDeleted ? undefined : (e) => { e.stopPropagation(); handleLongPressStart(message._id); }}
          onTouchEnd={message.isDeleted ? undefined : handleLongPressEnd}
          onTouchMove={message.isDeleted ? undefined : handleLongPressEnd}
          title={message.isDeleted ? undefined : "Double-click to ❤️ react"}
        >
          {message.viewOnce && !message.viewedOnce ? (
            <ViewOnceMedia
              message={message}
              onOpened={() => markViewOnceOpened(message._id)}
            />
          ) : (
            <>
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="max-w-full sm:max-w-[280px] rounded-lg mb-1.5 shadow-sm object-cover"
                />
              )}
              {message.file && (
                <div className="mb-1.5">
                  {message.file.type.startsWith("image/") ? (
                    <img
                      src={message.file.url}
                      alt={message.file.name}
                      className="max-w-full sm:max-w-[280px] rounded-lg shadow-sm object-cover"
                    />
                  ) : message.file.type.startsWith("video/") ? (
                    <video controls className="max-w-full sm:max-w-[280px] rounded-lg shadow-sm">
                      <source src={message.file.url} type={message.file.type} />
                    </video>
                  ) : (
                    <a
                      href={message.file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2.5 p-2 rounded-xl transition-colors ${
                        isSelf 
                          ? "bg-white/10 hover:bg-white/15 text-white" 
                          : "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100"
                      }`}
                    >
                      <Paperclip size={15} />
                      <span className="text-xs font-medium truncate max-w-[120px]">{message.file.name}</span>
                      <span className="text-[10px] opacity-75 whitespace-nowrap">
                        ({(message.file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </a>
                  )}
                </div>
              )}
              {message.text && (
                <p className="text-[14px] leading-relaxed break-words font-medium">
                  {message.text}
                  {message.isEdited && !message.isDeleted && (
                    <span className="text-[10px] opacity-75 ml-2 font-normal">(edited)</span>
                  )}
                </p>
              )}
              {message.viewOnce && message.viewedOnce && (
                <p className={`mt-1 text-xs ${isSelf ? "text-white/60" : "text-slate-500 dark:text-slate-400"}`}>
                  Opened • View once media
                </p>
              )}
            </>
          )}
        </div>

        {!isSelf && !message.isDeleted && (
          <div className="opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-200 flex-shrink-0 select-none">
            <button
              className="size-6 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              onClick={handleMenuClick}
            >
              <MoreVertical size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Reactions list */}
      {!message.isDeleted && (
        <div className={`mt-1.5 select-none ${isSelf ? "mr-1" : "ml-1"}`}>
          <MessageReactions message={message} />
        </div>
      )}

      {/* Read Status checkmark indicators (Only for self) */}
      {isSelf && !message.isDeleted && (
        <div className="px-1.5 mt-1 text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1 select-none font-semibold">
          {message.isRead ? (
            <>
              <CheckCheck size={11} className="text-blue-500 dark:text-blue-400" />
              <span>Read</span>
            </>
          ) : (
            <>
              <Check size={11} />
              <span>Sent</span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MessageItem;
