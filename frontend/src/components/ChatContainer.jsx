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
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader
        onSearchClick={() => setShowSearch(!showSearch)}
        onPinnedClick={() => setShowPinned(!showPinned)}
      />

      {/* Search Panel */}
      {showSearch && (
        <MessageSearch userId={selectedUser._id} onClose={() => setShowSearch(false)} />
      )}

      {/* Pinned Messages Panel */}
      {showPinned && (
        <div className="bg-base-100 border-b border-base-300 p-4 max-h-48 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Pinned Messages ({pinnedMessages.length})</h3>
            <button
              onClick={() => setShowPinned(false)}
              className="btn btn-sm btn-ghost"
            >
              ✕
            </button>
          </div>
          {pinnedMessages.length > 0 ? (
            <div className="space-y-2">
              {pinnedMessages.map((msg) => (
                <div
                  key={msg._id}
                  className="p-2 bg-base-200 rounded-lg text-sm truncate hover:bg-base-300 cursor-pointer"
                >
                  <p className="truncate">{msg.text || "[Media]"}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-zinc-500 py-4">No pinned messages</p>
          )}
        </div>
      )}

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 message-container"
        onClick={() => {
          if (ignoreNextClickRef.current) { ignoreNextClickRef.current = false; return; }
          if (activeMessageMenu) setActiveMessageMenu(null);
        }}
      >
        {messages.map((message, index) => {
          if (message.isDeleted) return null;

          return (
            <div
              key={message._id}
              className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"} message-item group`}
              ref={index === messages.length - 1 ? messageEndRef : null}
              style={{
                animation: `slideIn 0.3s ease-out ${index * 0.05}s both`,
              }}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>

              <div className={`flex flex-col ${message.senderId === authUser._id ? "items-end" : "items-start"}`}>
                {/* Quoted Message */}
                {message.replyTo && (
                  <QuotedMessage replyTo={message.replyTo} />
                )}

                <div className="flex gap-2 items-end group/message">
                  {message.senderId !== authUser._id && (
                    <div className="relative opacity-0 group-hover/message:opacity-100 transition-opacity msg-action-btn">
                      <button
                        className="btn btn-xs btn-ghost"
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
                  )}

                  <div>
                    <div
                      className="chat-bubble flex flex-col hover:cursor-pointer no-callout"
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
                      {message.image && (
                        <img
                          src={message.image}
                          alt="Attachment"
                          className="sm:max-w-[200px] rounded-md mb-2"
                        />
                      )}
                      {message.file && (
                        <div className="mb-2">
                          {message.file.type.startsWith("image/") ? (
                            <img
                              src={message.file.url}
                              alt={message.file.name}
                              className="sm:max-w-[200px] rounded-md"
                            />
                          ) : message.file.type.startsWith("video/") ? (
                            <video controls className="sm:max-w-[200px] rounded-md">
                              <source src={message.file.url} type={message.file.type} />
                            </video>
                          ) : (
                            <a
                              href={message.file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 p-2 bg-base-200 rounded-md hover:bg-base-300"
                            >
                              <Paperclip size={16} />
                              <span className="text-sm">{message.file.name}</span>
                              <span className="text-xs opacity-50">
                                ({(message.file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </a>
                          )}
                        </div>
                      )}
                      {message.text && (
                        <p>
                          {message.text}
                          {message.isEdited && (
                            <span className="text-xs opacity-50 ml-2">(edited)</span>
                          )}
                        </p>
                      )}
                    </div>

                    {/* Reactions */}
                    <MessageReactions message={message} />

                    {/* Message info */}
                    <div className="chat-header mb-1 text-xs opacity-50">
                      <time>{formatMessageTime(message.createdAt)}</time>
                      {message.isPinned && <span className="ml-2">📌 Pinned</span>}
                    </div>
                  </div>

                  {message.senderId === authUser._id && (
                    <div className="relative opacity-0 group-hover/message:opacity-100 transition-opacity msg-action-btn">
                      <button
                        className="btn btn-xs btn-ghost"
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
                  )}
                </div>

                {/* Read Status */}
                {message.senderId === authUser._id && (
                  <div className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                    {message.isRead ? (
                      <>
                        <CheckCheck size={12} className="text-green-500" />
                        Read
                      </>
                    ) : (
                      <>
                        <Check size={12} />
                        Sent
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {activeMessageMenu && <div className="fixed inset-0 z-40" onClick={closeMessageMenu} />}

        {activeMenuMessage && (
          <div
            className="fixed z-50"
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
          <div className="chat chat-start message-item" style={{ animation: "slideIn 0.3s ease-out" }}>
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img src={selectedUser.profilePic || "/avatar.png"} alt="profile pic" />
              </div>
            </div>
            <div className="chat-bubble">
              <div className="typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reply Preview */}
      <ReplyPreview />

      {/* Editing Indicator */}
      <EditingIndicator />

      <MessageInput />

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message-item {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatContainer;
