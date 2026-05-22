import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { Paperclip, Check, CheckCheck, MoreVertical, Pin } from "lucide-react";
import MessageReactions from "./MessageReactions";
import QuotedMessage from "./QuotedMessage";
import ViewOnceMedia from "./ViewOnceMedia";
import LinkPreview from "./LinkPreview";

const MessageItem = ({ 
  message, 
  index, 
  messagesLength, 
  messages,
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

  const isNextSameSender = messages && index < messagesLength - 1 &&
    messages[index + 1]?.senderId === message.senderId &&
    !messages[index + 1]?.isDeleted;

  const isPrevSameSender = messages && index > 0 &&
    messages[index - 1]?.senderId === message.senderId &&
    !messages[index - 1]?.isDeleted;

  const showAvatar = !isSelf && !isNextSameSender;
  const showNameHeader = !isSelf && (!isPrevSameSender || message.isDeleted);
  const bubbleRoundness = isSelf
    ? (isPrevSameSender && isNextSameSender ? "rounded-2xl"
      : isPrevSameSender ? "rounded-br-2xl"
      : isNextSameSender ? "rounded-tr-2xl"
      : "rounded-br-2xl rounded-tr-none")
    : (isPrevSameSender && isNextSameSender ? "rounded-2xl"
      : isPrevSameSender ? "rounded-bl-2xl"
      : isNextSameSender ? "rounded-tl-2xl"
      : "rounded-bl-2xl rounded-tl-none");

  const commonBubbleClasses = `relative flex flex-col select-text px-4 py-2.5 border shadow-soft transition-all no-callout ${bubbleRoundness} ${
    message.isDeleted
      ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-border dark:border-border-dark italic font-normal"
      : isSelf
        ? "bg-primary text-white border-transparent"
        : "bg-surface dark:bg-surface-dark text-slate-900 dark:text-slate-100 border-border dark:border-border-dark"
  } hover:cursor-pointer`;

  const marginBottom = isNextSameSender ? "mb-0.5" : "mb-0";

  return (
    <div
      ref={index === messagesLength - 1 ? messageEndRef : null}
      className={`flex flex-col ${isSelf ? "items-end" : "items-start"} w-full message-item group/msg ${marginBottom}`}
      style={{
        animation: `messageEntry 0.25s cubic-bezier(0.16, 1, 0.3, 1) ${Math.min(index * 0.015, 0.3)}s both`,
      }}
    >
      {!isSelf && (
        <div className={`flex gap-2 items-end w-full ${showAvatar ? "" : "ml-[52px]"} msg-bubble-container ${isSelf ? "justify-end" : ""}`}>
          {showAvatar ? (
            <div className="flex-shrink-0 select-none mb-0">
              <img
                src={selectedUser?.profilePic || "/avatar.png"}
                alt={selectedUser?.fullName || "User"}
                className="size-9 rounded-full object-cover shadow-sm border border-slate-200 dark:border-slate-700"
              />
            </div>
          ) : !isNextSameSender && (
            <div className="w-9 flex-shrink-0" />
          )}
          <div className="flex flex-col items-start min-w-0 flex-1">
             <MessageContent 
               isSelf={isSelf}
               message={message}
               selectedUser={selectedUser}
               showNameHeader={showNameHeader}
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
        <div className="msg-bubble-container">
          <MessageContent 
            isSelf={isSelf}
            message={message}
            selectedUser={selectedUser}
            showNameHeader={false}
            handleDoubleClick={handleDoubleClick}
            handleLongPressStart={handleLongPressStart}
            handleLongPressEnd={handleLongPressEnd}
            handleMenuClick={handleMenuClick}
            markViewOnceOpened={markViewOnceOpened}
            commonBubbleClasses={commonBubbleClasses}
          />
        </div>
      )}
    </div>
  );
};

const MessageContent = ({ 
  isSelf, 
  message, 
  selectedUser, 
  showNameHeader,
  handleDoubleClick, 
  handleLongPressStart, 
  handleLongPressEnd, 
  handleMenuClick,
  markViewOnceOpened,
  commonBubbleClasses
}) => {
  const linkify = (text) => {
    if (!text) return "";
    const urlRegex = /(https?:\/\/[^\s<]+[^.,:;"'!)\]\s])/g;
    return text.split(urlRegex).map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={`underline decoration-2 underline-offset-2 transition-opacity hover:opacity-80 ${
              isSelf ? "text-white font-bold" : "text-primary dark:text-primary font-bold"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <>
      {/* Header: Sender name (only for first message in a group from sender) */}
      {showNameHeader && !message.isDeleted && (
        <div className="flex items-center gap-1.5 mb-0.5 px-1 text-[11px] text-primary font-bold select-none">
          {selectedUser?.fullName}
        </div>
      )}

      {/* Quoted Message */}
      {message.replyTo && !message.isDeleted && (
        <div className="mb-1.5">
          <QuotedMessage replyTo={message.replyTo} />
        </div>
      )}

      {/* Bubble Row */}
      <div className={`flex gap-1.5 items-end group/bubble ${isSelf ? "justify-end" : ""}`}>
        {isSelf && !message.isDeleted && (
          <div className="opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-200 flex-shrink-0 select-none self-end pb-1.5 order-first">
            <button
              className="size-6 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              onClick={handleMenuClick}
            >
              <MoreVertical size={14} />
            </button>
          </div>
        )}

        <div
          className={`${commonBubbleClasses} ${message.isDeleted ? "" : (isSelf ? "bubble-tail-self" : "bubble-tail-other")}`}
          onDoubleClick={handleDoubleClick}
          onTouchStart={message.isDeleted ? undefined : (e) => { e.stopPropagation(); handleLongPressStart(message._id); }}
          onTouchEnd={message.isDeleted ? undefined : handleLongPressEnd}
          onTouchMove={message.isDeleted ? undefined : handleLongPressEnd}
          title={message.isDeleted ? undefined : "Double-tap to ❤️"}
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
                  className="max-w-full sm:max-w-[260px] rounded-xl mb-1 object-cover"
                />
              )}
              {message.file && (
                <div className="mb-1">
                  {message.file.type.startsWith("image/") ? (
                    <img
                      src={message.file.url}
                      alt={message.file.name}
                      className="max-w-full sm:max-w-[260px] rounded-xl object-cover"
                    />
                  ) : message.file.type.startsWith("video/") ? (
                    <video controls className="max-w-full sm:max-w-[260px] rounded-xl">
                      <source src={message.file.url} type={message.file.type} />
                    </video>
                  ) : message.file.type.startsWith("audio/") ? (
                    <div className={`p-2 rounded-xl min-w-[180px] ${isSelf ? "bg-white/10" : "bg-slate-100 dark:bg-slate-800"}`}>
                      <audio controls className="w-full h-8">
                        <source src={message.file.url} type={message.file.type} />
                      </audio>
                    </div>
                  ) : (
                    <a
                      href={message.file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 p-2 rounded-xl transition-colors ${
                        isSelf 
                          ? "bg-white/10 hover:bg-white/15 text-white" 
                          : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100"
                      }`}
                    >
                      <Paperclip size={14} />
                      <span className="text-xs font-medium truncate max-w-[100px]">{message.file.name}</span>
                      <span className="text-[10px] opacity-75">
                        ({(message.file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </a>
                  )}
                </div>
              )}
              {message.text && (
                <div className="flex flex-col">
                  <p className="text-[14px] leading-relaxed break-words font-medium">
                    {linkify(message.text)}
                    {message.isEdited && !message.isDeleted && (
                      <span className="text-[10px] opacity-70 ml-1.5 font-normal">edited</span>
                    )}
                  </p>
                  {!message.isDeleted && (() => {
                    const urlRegex = /(https?:\/\/[^\s<]+[^.,:;"'!)\]\s])/;
                    const match = message.text.match(urlRegex);
                    if (match) {
                      return <LinkPreview url={match[0]} isSelf={isSelf} />;
                    }
                    return null;
                  })()}
                </div>
              )}
              {message.viewOnce && message.viewedOnce && (
                <p className={`mt-1 text-xs ${isSelf ? "text-white/60" : "text-slate-500 dark:text-slate-400"}`}>
                  Opened • View once media
                </p>
              )}
            </>
          )}

          <div className={`flex items-center gap-1 mt-1 -mb-1 ${isSelf ? "justify-end" : "justify-start"}`}>
            <span className={`text-[10px] font-medium ${isSelf ? "text-white/60" : "text-slate-500 dark:text-slate-400"}`}>
              {formatMessageTime(message.createdAt)}
            </span>
            {message.isPinned && !message.isDeleted && (
              <Pin size={10} className="text-amber-400" />
            )}
            {isSelf && !message.isDeleted && (
              message.isRead
                ? <CheckCheck size={12} className="text-blue-200" />
                : <Check size={12} className="text-white/50" />
            )}
          </div>
        </div>

        {!isSelf && !message.isDeleted && (
          <div className="opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-200 flex-shrink-0 select-none self-end pb-1.5">
            <button
              className="size-6 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              onClick={handleMenuClick}
            >
              <MoreVertical size={14} />
            </button>
          </div>
        )}
      </div>

      {!message.isDeleted && (
        <div className={`select-none ${isSelf ? "pl-1" : "pl-1"}`}>
          <MessageReactions message={message} />
        </div>
      )}
    </>
  );
};

export default MessageItem;
