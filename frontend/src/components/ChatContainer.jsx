import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { Paperclip, Check, CheckCheck, MoreVertical } from "lucide-react";
import MessageReactions from "./MessageReactions";
import QuotedMessage from "./QuotedMessage";
import MessageActions from "./MessageActions";
import MessageSearch from "./MessageSearch";
import ReplyPreview from "./ReplyPreview";
import EditingIndicator from "./EditingIndicator";
import ViewOnceMedia from "./ViewOnceMedia";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    typingUsers,
    pinnedMessages,
    getPinnedMessages,
    editingMessageId,
    setEditingMessage,
    addReaction,
    removeReaction,
    toggleMuteChat,
    togglePinChat,
    markViewOnceOpened,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const longPressRef = useRef(null);
  const ignoreNextClickRef = useRef(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showPinned, setShowPinned] = useState(false);
  const [activeMessageMenu, setActiveMessageMenu] = useState(null);
  const [messageMenuPos, setMessageMenuPos] = useState({ top: 0, left: 0 });

  const openMessageMenu = (messageId, buttonRect) => {
    const menuHeight = 260;
    const menuWidth = 220;
    const offset = 8;

    let top = buttonRect.bottom + offset;
    if (top + menuHeight > window.innerHeight) {
      top = Math.max(offset, buttonRect.top - menuHeight - offset);
    }

    let left = buttonRect.left;
    if (left + menuWidth > window.innerWidth - 12) {
      left = Math.max(offset, window.innerWidth - menuWidth - offset);
    }

    setMessageMenuPos({ top, left });
    setActiveMessageMenu(messageId);
  };

  const closeMessageMenu = () => setActiveMessageMenu(null);

  const activeMenuMessage = activeMessageMenu ? messages.find((m) => m._id === activeMessageMenu) : null;

  const handleLongPressStart = (messageId) => {
    longPressRef.current = setTimeout(() => {
      ignoreNextClickRef.current = true;
      setActiveMessageMenu(messageId);
      if (navigator.vibrate) navigator.vibrate(50);
    }, 500);
  };

  const handleLongPressEnd = () => {
    if (longPressRef.current) {
      clearTimeout(longPressRef.current);
      longPressRef.current = null;
    }
  };

  useEffect(() => {
    getMessages(selectedUser._id);
    getPinnedMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, getPinnedMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const handler = (e) => {
      if (!selectedUser?._id) return;

      // Ctrl+K = open search
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowSearch((s) => !s);
      }

      // Ctrl+M = mute/unmute chat
      if (e.ctrlKey && e.key.toLowerCase() === "m") {
        e.preventDefault();
        toggleMuteChat(selectedUser._id);
      }

      // Ctrl+P = pin/unpin chat
      if (e.ctrlKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        togglePinChat(selectedUser._id);
      }

      // Ctrl+E = edit last own message
      if (e.ctrlKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        const lastOwn = [...messages].reverse().find((msg) => msg.senderId === authUser._id && !msg.isDeleted);
        if (lastOwn) {
          setEditingMessage(lastOwn._id);
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [messages, selectedUser, authUser, toggleMuteChat, togglePinChat, setEditingMessage]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col h-full bg-base-100 dark:bg-zinc-900">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-base-100 dark:bg-zinc-900">
      <ChatHeader
        onSearchClick={() => setShowSearch(!showSearch)}
        onPinnedClick={() => setShowPinned(!showPinned)}
      />

      {/* Search Panel */}
      {showSearch && (
        <div className="flex-shrink-0">
          <MessageSearch userId={selectedUser._id} onClose={() => setShowSearch(false)} />
        </div>
      )}

      {/* Pinned Messages Panel */}
      {showPinned && (
        <div className="bg-base-100 border-b border-base-200 p-4 max-h-48 overflow-y-auto flex-shrink-0 z-20 shadow-inner">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Pinned Messages ({pinnedMessages.length})</h3>
            <button
              onClick={() => setShowPinned(false)}
              className="btn btn-xs btn-ghost btn-circle"
            >
              ✕
            </button>
          </div>
          {pinnedMessages.length > 0 ? (
            <div className="space-y-2">
              {pinnedMessages.map((msg) => (
                <div
                  key={msg._id}
                  className="p-2.5 bg-base-200 hover:bg-base-300 rounded-xl text-sm truncate cursor-pointer transition-colors"
                >
                  <p className="truncate font-medium text-base-content/85">{msg.text || "[Media]"}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xs text-base-content/40 py-4">No pinned messages</p>
          )}
        </div>
      )}

      {/* Messages Viewport */}
      <div
        className="flex-1 overflow-y-auto px-6 py-6 space-y-6 message-container select-text"
        onClick={() => {
          if (ignoreNextClickRef.current) { ignoreNextClickRef.current = false; return; }
          if (activeMessageMenu) setActiveMessageMenu(null);
        }}
      >
        {messages.map((message, index) => {
          if (message.isDeleted) return null;

          const isSelf = message.senderId === authUser._id;

          if (isSelf) {
            // Sent message layout (aligned to right, no avatar)
            return (
              <div
                key={message._id}
                ref={index === messages.length - 1 ? messageEndRef : null}
                className="flex flex-col items-end w-full message-item group/msg"
                style={{
                  animation: `slideIn 0.28s ease-out ${Math.min(index * 0.02, 0.4)}s both`,
                }}
              >
                {/* Header: Sender and Time */}
                <div className="flex items-center gap-1.5 mb-1 px-1.5 text-[11px] text-base-content/40 select-none">
                  <span className="font-semibold text-base-content/65">You</span>
                  <span>•</span>
                  <time>{formatMessageTime(message.createdAt)}</time>
                  {message.isPinned && <span className="ml-1">📌 Pinned</span>}
                </div>

                {/* Quoted Message */}
                {message.replyTo && (
                  <div className="mb-1.5 max-w-[65%] text-left">
                    <QuotedMessage replyTo={message.replyTo} />
                  </div>
                )}

                {/* Bubble Row */}
                <div className="flex gap-2 items-end justify-end group/bubble w-full max-w-[65%]">
                  {/* Action Menu (hover) */}
                  <div className="opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-200 flex-shrink-0 select-none">
                    <button
                      className="btn btn-xs btn-ghost btn-circle text-base-content/40 hover:bg-base-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        const rect = e.currentTarget.getBoundingClientRect();
                        if (activeMessageMenu === message._id) {
                          closeMessageMenu();
                        } else {
                          openMessageMenu(message._id, rect);
                        }
                      }}
                    >
                      <MoreVertical size={14} />
                    </button>
                  </div>

                  {/* Message Bubble */}
                  <div
                    className="chat-bubble flex flex-col hover:cursor-pointer select-text px-4 py-2.5 rounded-2xl rounded-tr-none bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm hover:brightness-[0.98] transition-all no-callout"
                    onDoubleClick={() => {
                      const hasHeart = message.reactions?.["❤️"]?.includes(authUser._id);
                      if (hasHeart) {
                        removeReaction(message._id, "❤️");
                      } else {
                        addReaction(message._id, "❤️");
                      }
                    }}
                    onTouchStart={(e) => { e.stopPropagation(); handleLongPressStart(message._id); }}
                    onTouchEnd={handleLongPressEnd}
                    onTouchMove={handleLongPressEnd}
                    title="Double-click to ❤️ react"
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
                            className="max-w-full sm:max-w-[240px] rounded-lg mb-1.5 shadow-sm"
                          />
                        )}
                        {message.file && (
                          <div className="mb-1.5">
                            {message.file.type.startsWith("image/") ? (
                              <img
                                src={message.file.url}
                                alt={message.file.name}
                                className="max-w-full sm:max-w-[240px] rounded-lg shadow-sm"
                              />
                            ) : message.file.type.startsWith("video/") ? (
                              <video controls className="max-w-full sm:max-w-[240px] rounded-lg shadow-sm">
                                <source src={message.file.url} type={message.file.type} />
                              </video>
                            ) : (
                              <a
                                href={message.file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2.5 p-2 bg-white/10 hover:bg-white/15 rounded-xl text-white transition-colors"
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
                            {message.isEdited && (
                              <span className="text-[10px] opacity-75 ml-2 font-normal">(edited)</span>
                            )}
                          </p>
                        )}
                        {message.viewOnce && message.viewedOnce && (
                          <p className="mt-1 text-xs text-white/60">Opened • View once media</p>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Reactions list */}
                <div className="mr-1 mt-1.5 select-none">
                  <MessageReactions message={message} />
                </div>

                {/* Read Status checkmark indicators */}
                <div className="px-1.5 mt-1 text-[10px] text-base-content/40 flex items-center gap-1 select-none">
                  {message.isRead ? (
                    <>
                      <CheckCheck size={11} className="text-primary" />
                      <span>Read</span>
                    </>
                  ) : (
                    <>
                      <Check size={11} />
                      <span>Sent</span>
                    </>
                  )}
                </div>
              </div>
            );
          } else {
            // Received message layout (aligned to left, with avatar)
            return (
              <div
                key={message._id}
                ref={index === messages.length - 1 ? messageEndRef : null}
                className="flex gap-3 items-start w-full message-item group/msg"
                style={{
                  animation: `slideIn 0.28s ease-out ${Math.min(index * 0.02, 0.4)}s both`,
                }}
              >
                {/* Avatar */}
                <div className="flex-shrink-0 mt-0.5 select-none">
                  <img
                    src={selectedUser.profilePic || "/avatar.png"}
                    alt={selectedUser.fullName}
                    className="size-10 rounded-full object-cover shadow-sm border border-base-200"
                  />
                </div>

                {/* Content block */}
                <div className="flex flex-col items-start max-w-[65%]">
                  {/* Header: Sender and Time */}
                  <div className="flex items-center gap-1.5 mb-1 px-1.5 text-[11px] text-base-content/40 select-none">
                    <span className="font-semibold text-base-content/75">{selectedUser.fullName}</span>
                    <span>•</span>
                    <time>{formatMessageTime(message.createdAt)}</time>
                    {message.isPinned && <span className="ml-1">📌 Pinned</span>}
                  </div>

                  {/* Quoted Message */}
                  {message.replyTo && (
                    <div className="mb-1.5 w-full text-left">
                      <QuotedMessage replyTo={message.replyTo} />
                    </div>
                  )}

                  {/* Bubble Row */}
                  <div className="flex gap-2 items-end group/bubble w-full">
                    {/* Message Bubble */}
                    <div
                      className="chat-bubble flex flex-col hover:cursor-pointer select-text px-4 py-2.5 rounded-2xl rounded-tl-none bg-base-200/90 dark:bg-zinc-800 text-base-content shadow-sm hover:bg-base-200 dark:hover:bg-zinc-800/80 transition-all border border-base-200/30 dark:border-zinc-700/40 no-callout"
                      onDoubleClick={() => {
                        const hasHeart = message.reactions?.["❤️"]?.includes(authUser._id);
                        if (hasHeart) {
                          removeReaction(message._id, "❤️");
                        } else {
                          addReaction(message._id, "❤️");
                        }
                      }}
                      onTouchStart={(e) => { e.stopPropagation(); handleLongPressStart(message._id); }}
                      onTouchEnd={handleLongPressEnd}
                      onTouchMove={handleLongPressEnd}
                      title="Double-click to ❤️ react"
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
                              className="max-w-full sm:max-w-[240px] rounded-lg mb-1.5 shadow-sm"
                            />
                          )}
                          {message.file && (
                            <div className="mb-1.5">
                              {message.file.type.startsWith("image/") ? (
                                <img
                                  src={message.file.url}
                                  alt={message.file.name}
                                  className="max-w-full sm:max-w-[240px] rounded-lg shadow-sm"
                                />
                              ) : message.file.type.startsWith("video/") ? (
                                <video controls className="max-w-full sm:max-w-[240px] rounded-lg shadow-sm">
                                  <source src={message.file.url} type={message.file.type} />
                                </video>
                              ) : (
                                <a
                                  href={message.file.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2.5 p-2 bg-base-300 dark:bg-zinc-700 hover:bg-base-300/80 rounded-xl text-base-content transition-colors"
                                >
                                  <Paperclip size={15} />
                                  <span className="text-xs font-medium truncate max-w-[120px]">{message.file.name}</span>
                                  <span className="text-[10px] opacity-60 whitespace-nowrap">
                                    ({(message.file.size / 1024 / 1024).toFixed(2)} MB)
                                  </span>
                                </a>
                              )}
                            </div>
                          )}
                          {message.text && (
                            <p className="text-[14px] leading-relaxed break-words font-medium text-base-content/90">
                              {message.text}
                              {message.isEdited && (
                                <span className="text-[10px] opacity-55 ml-2 font-normal">(edited)</span>
                              )}
                            </p>
                          )}
                          {message.viewOnce && message.viewedOnce && (
                            <p className="mt-1 text-xs text-base-content/50">Opened • View once media</p>
                          )}
                        </>
                      )}
                    </div>

                    {/* Action Menu (hover) */}
                    <div className="opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-200 flex-shrink-0 select-none">
                      <button
                        className="btn btn-xs btn-ghost btn-circle text-base-content/40 hover:bg-base-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          if (activeMessageMenu === message._id) {
                            closeMessageMenu();
                          } else {
                            openMessageMenu(message._id, rect);
                          }
                        }}
                      >
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Reactions list */}
                  <div className="ml-1 mt-1.5 select-none">
                    <MessageReactions message={message} />
                  </div>
                </div>
              </div>
            );
          }
        })}

        {activeMessageMenu && <div className="fixed inset-0 z-40" onClick={closeMessageMenu} />}

        {activeMenuMessage && (
          <div
            className="fixed z-50 select-none"
            style={{ top: `${messageMenuPos.top}px`, left: `${messageMenuPos.left}px`, minWidth: "220px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <MessageActions
              message={activeMenuMessage}
              onClose={closeMessageMenu}
            />
          </div>
        )}

        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <div className="flex gap-3 items-start w-full message-item" style={{ animation: "slideIn 0.3s ease-out" }}>
            <div className="flex-shrink-0 mt-0.5">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="size-10 rounded-full object-cover shadow-sm border border-base-200"
              />
            </div>
            <div className="flex flex-col items-start max-w-[65%]">
              <div className="flex items-center gap-1.5 mb-1 px-1.5 text-[11px] text-base-content/40">
                <span className="font-semibold text-base-content/75">{selectedUser.fullName}</span>
                <span>•</span>
                <span className="text-emerald-500 font-semibold animate-pulse">Typing</span>
              </div>
              <div className="px-4.5 py-3 rounded-2xl rounded-tl-none bg-base-200/90 dark:bg-zinc-800 text-base-content shadow-sm flex items-center justify-center border border-base-200/30 dark:border-zinc-700/40">
                <div className="typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messageEndRef} />
      </div>

      {/* Reply Preview */}
      <ReplyPreview />

      {/* Editing Indicator */}
      <EditingIndicator />

      {/* Input container */}
      <div className="flex-shrink-0">
        <MessageInput />
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message-item {
          animation: slideIn 0.28s ease-out;
        }

        .typing span {
          width: 5px;
          height: 5px;
          margin: 0 1.5px;
          background-color: currentColor;
          opacity: 0.45;
          border-radius: 50%;
          display: inline-block;
          animation: bounceTyping 1.3s infinite ease-in-out;
        }

        .typing span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes bounceTyping {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatContainer;
