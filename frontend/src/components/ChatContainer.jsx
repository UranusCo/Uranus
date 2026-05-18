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
    const menuHeight = 270;
    const menuWidth = 220;
    const offset = 8;

    // Determine vertical placement
    let top = buttonRect.top;
    if (top + menuHeight > window.innerHeight) {
      top = Math.max(offset, window.innerHeight - menuHeight - offset);
    }

    // Determine horizontal placement based on screen halves
    let left;
    if (buttonRect.left > window.innerWidth / 2) {
      // Sent message (on the right half): place menu to the left of the button
      left = buttonRect.left - menuWidth - offset;
    } else {
      // Received message (on the left half): place menu to the right of the button
      left = buttonRect.left + buttonRect.width + offset;
    }

    // Out of bounds screen safeguards
    if (left < offset) left = offset;
    if (left + menuWidth > window.innerWidth - offset) {
      left = window.innerWidth - menuWidth - offset;
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

      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowSearch((s) => !s);
      }

      if (e.ctrlKey && e.key.toLowerCase() === "m") {
        e.preventDefault();
        toggleMuteChat(selectedUser._id);
      }

      if (e.ctrlKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        togglePinChat(selectedUser._id);
      }

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
      <div className="flex-1 flex flex-col h-full bg-slate-100 dark:bg-slate-900 transition-colors duration-200">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-100 dark:bg-slate-900 transition-colors duration-200">
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
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 max-h-48 overflow-y-auto flex-shrink-0 z-20 shadow-inner transition-colors duration-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-slate-855 dark:text-slate-100">Pinned Messages ({pinnedMessages.length})</h3>
            <button
              onClick={() => setShowPinned(false)}
              className="size-5 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition-colors text-xs font-semibold"
            >
              ✕
            </button>
          </div>
          {pinnedMessages.length > 0 ? (
            <div className="space-y-2">
              {pinnedMessages.map((msg) => (
                <div
                  key={msg._id}
                  className="p-2.5 bg-slate-50 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-700/60 rounded-xl text-sm truncate cursor-pointer transition-colors text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50"
                >
                  <p className="truncate font-medium text-slate-750 dark:text-slate-200">{msg.text || "[Media]"}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xs text-slate-400 dark:text-slate-500 py-4 font-semibold">No pinned messages</p>
          )}
        </div>
      )}

      {/* Messages Viewport */}
      <div
        className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 message-container select-text"
        onClick={() => {
          if (ignoreNextClickRef.current) { ignoreNextClickRef.current = false; return; }
          if (activeMessageMenu) setActiveMessageMenu(null);
        }}
      >
        <div className="max-w-[800px] w-full mx-auto space-y-3">
          {messages.map((message, index) => {
            if (message.isDeleted) return null;

            const isSelf = message.senderId === authUser._id;

            if (isSelf) {
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
                  <div className="flex items-center gap-1.5 mb-1 px-1.5 text-[11px] text-slate-400 dark:text-slate-500 select-none font-semibold">
                    <span className="text-slate-500 dark:text-slate-455 font-bold">You</span>
                    <span>•</span>
                    <time>{formatMessageTime(message.createdAt)}</time>
                    {message.isPinned && <span className="ml-1 text-amber-500">📌 Pinned</span>}
                  </div>

                  {/* Quoted Message */}
                  {message.replyTo && (
                    <div className="mb-1.5 max-w-[60%] text-left">
                      <QuotedMessage replyTo={message.replyTo} />
                    </div>
                  )}

                  {/* Bubble Row */}
                  <div className="flex gap-2 items-end justify-end group/bubble w-full max-w-[60%]">
                    {/* Action Menu (hover) */}
                    <div className="opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-200 flex-shrink-0 select-none">
                      <button
                        className="size-6 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
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
                      className="flex flex-col hover:cursor-pointer select-text px-4 py-2.5 rounded-2xl rounded-tr-none bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm hover:brightness-[0.98] transition-all no-callout"
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
                              className="max-w-full sm:max-w-[240px] rounded-lg mb-1.5 shadow-sm object-cover"
                            />
                          )}
                          {message.file && (
                            <div className="mb-1.5">
                              {message.file.type.startsWith("image/") ? (
                                <img
                                  src={message.file.url}
                                  alt={message.file.name}
                                  className="max-w-full sm:max-w-[240px] rounded-lg shadow-sm object-cover"
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
                      className="size-10 rounded-full object-cover shadow-sm border border-slate-200 dark:border-slate-700"
                    />
                  </div>

                  {/* Content block */}
                  <div className="flex flex-col items-start max-w-[60%]">
                    {/* Header: Sender and Time */}
                    <div className="flex items-center gap-1.5 mb-1 px-1.5 text-[11px] text-slate-400 dark:text-slate-550 select-none font-semibold">
                      <span className="font-bold text-slate-600 dark:text-slate-350">{selectedUser.fullName}</span>
                      <span>•</span>
                      <time>{formatMessageTime(message.createdAt)}</time>
                      {message.isPinned && <span className="ml-1 text-amber-500">📌 Pinned</span>}
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
                        className="flex flex-col hover:cursor-pointer select-text px-4 py-2.5 rounded-2xl rounded-tl-none bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-750/80 transition-all border border-slate-200/50 dark:border-slate-700/50 shadow-sm no-callout"
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
                                className="max-w-full sm:max-w-[240px] rounded-lg mb-1.5 shadow-sm object-cover"
                              />
                            )}
                            {message.file && (
                              <div className="mb-1.5">
                                {message.file.type.startsWith("image/") ? (
                                  <img
                                    src={message.file.url}
                                    alt={message.file.name}
                                    className="max-w-full sm:max-w-[240px] rounded-lg shadow-sm object-cover"
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
                                    className="flex items-center gap-2.5 p-2 bg-slate-200 dark:bg-slate-655 hover:bg-slate-300/80 dark:hover:bg-slate-500/80 rounded-xl text-slate-800 dark:text-slate-100 transition-colors"
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
                              <p className="text-[14px] leading-relaxed break-words font-medium text-slate-800 dark:text-slate-100">
                                {message.text}
                                {message.isEdited && (
                                  <span className="text-[10px] opacity-55 ml-2 font-normal">(edited)</span>
                                )}
                              </p>
                            )}
                            {message.viewOnce && message.viewedOnce && (
                              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Opened • View once media</p>
                            )}
                          </>
                        )}
                      </div>

                      {/* Action Menu (hover) */}
                      <div className="opacity-0 group-hover/bubble:opacity-100 transition-opacity duration-200 flex-shrink-0 select-none">
                        <button
                          className="size-6 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
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



          {/* Typing Indicator */}
          {typingUsers.length > 0 && (
            <div className="flex gap-3 items-start w-full message-item" style={{ animation: "slideIn 0.3s ease-out" }}>
              <div className="flex-shrink-0 mt-0.5">
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt={selectedUser.fullName}
                  className="size-10 rounded-full object-cover shadow-sm border border-slate-200 dark:border-slate-700"
                />
              </div>
              <div className="flex flex-col items-start max-w-[60%]">
                <div className="flex items-center gap-1.5 mb-1 px-1.5 text-[11px] text-slate-450 dark:text-slate-500 font-semibold">
                  <span className="font-bold text-slate-600 dark:text-slate-350">{selectedUser.fullName}</span>
                  <span>•</span>
                  <span className="text-emerald-500 font-bold animate-pulse">Typing</span>
                </div>
                <div className="px-4.5 py-3 rounded-2xl rounded-tl-none bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm flex items-center justify-center border border-slate-200/40 dark:border-slate-600/40">
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

      {/* Floating high-z-index Actions Context Menu Portal (escapes scrolling stack) */}
      {activeMessageMenu && (
        <div 
          className="fixed inset-0 z-[9998] bg-black/[0.04] dark:bg-black/[0.12] backdrop-blur-[0.5px] transition-all" 
          onClick={closeMessageMenu} 
        />
      )}

      {activeMenuMessage && (
        <div
          className="fixed z-[9999] select-none bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-150 dark:border-slate-700/80 overflow-hidden animate-fadeIn"
          style={{ top: `${messageMenuPos.top}px`, left: `${messageMenuPos.left}px`, minWidth: "220px" }}
          onClick={(e) => e.stopPropagation()}
        >
          <MessageActions
            message={activeMenuMessage}
            onClose={closeMessageMenu}
          />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
