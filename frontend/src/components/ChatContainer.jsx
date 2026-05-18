import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { Paperclip, Check, CheckCheck, MoreVertical, ThumbsUp, Heart, Smile } from "lucide-react";
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

  const isMockGroup = selectedUser?._id === "mock-columbus-studio";

  // High fidelity local mock messages for group chats matching Mockup Screen 2
  const [groupMessages, setGroupMessages] = useState([
    {
      _id: "gm1",
      senderId: "member1",
      senderName: "Bayu Aji",
      senderPic: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80",
      text: "Hey Bagus, community is the corner is poorted with the grout?",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      reactions: { "👍": 1, "😄": 1 },
    },
    {
      _id: "gm2",
      senderId: "member2",
      senderName: "Poll",
      isPoll: true,
      options: [
        { text: "10.00 AM", votes: 55, selected: true },
        { text: "12.00 PM", votes: 45, selected: false },
      ],
      createdAt: new Date(Date.now() - 3600000 * 1.5).toISOString(),
      reactions: { "❤️": 1 },
    },
    {
      _id: "gm3",
      senderId: "member3",
      senderName: "Larry Abraham",
      senderPic: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80",
      text: "Hey I have re-momenise the content are pormpandent using the antess today am now.",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      _id: "gm4",
      senderId: "member4",
      senderName: "Dajeng Septi",
      senderPic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80",
      text: "Well? Don't we extraons how teach on the demanded?",
      createdAt: new Date(Date.now() - 1800000).toISOString(),
    },
  ]);

  const handlePollVote = (msgId, optionIndex) => {
    setGroupMessages(prev => prev.map(msg => {
      if (msg._id === msgId) {
        const newOptions = msg.options.map((opt, idx) => {
          if (idx === optionIndex) {
            const wasSelected = opt.selected;
            return {
              ...opt,
              selected: !wasSelected,
              votes: wasSelected ? opt.votes - 1 : opt.votes + 1,
            };
          }
          // Single vote behavior
          return {
            ...opt,
            selected: false,
            votes: opt.selected ? opt.votes - 1 : opt.votes,
          };
        });

        const total = newOptions.reduce((acc, o) => acc + o.votes, 0);
        const updatedOptions = newOptions.map(o => ({
          ...o,
          percent: total > 0 ? Math.round((o.votes / total) * 100) : 0,
        }));

        return { ...msg, options: updatedOptions };
      }
      return msg;
    }));
  };

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

  const activeMessages = isMockGroup ? groupMessages : messages;
  const activeMenuMessage = activeMessageMenu ? activeMessages.find((m) => m._id === activeMessageMenu) : null;

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
    if (isMockGroup) return; // Bypass API for mock group
    getMessages(selectedUser._id);
    getPinnedMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, getPinnedMessages, subscribeToMessages, unsubscribeFromMessages, isMockGroup]);

  useEffect(() => {
    if (messageEndRef.current && activeMessages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeMessages]);

  useEffect(() => {
    if (isMockGroup) return;
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
  }, [messages, selectedUser, authUser, toggleMuteChat, togglePinChat, setEditingMessage, isMockGroup]);

  if (isMessagesLoading && !isMockGroup) {
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
      {showSearch && !isMockGroup && (
        <div className="flex-shrink-0">
          <MessageSearch userId={selectedUser._id} onClose={() => setShowSearch(false)} />
        </div>
      )}

      {/* Pinned Messages Panel */}
      {showPinned && !isMockGroup && (
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 max-h-48 overflow-y-auto flex-shrink-0 z-20 shadow-inner transition-colors duration-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100">Pinned Messages ({pinnedMessages.length})</h3>
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
        <div className="max-w-[800px] w-full mx-auto space-y-4">
          {activeMessages.map((message, index) => {
            if (message.isDeleted) return null;

            const isSelf = message.senderId === authUser._id;

            if (isSelf) {
              return (
                <div
                  key={message._id}
                  ref={index === activeMessages.length - 1 ? messageEndRef : null}
                  className="flex flex-col items-end w-full message-item group/msg"
                  style={{
                    animation: `slideIn 0.28s ease-out ${Math.min(index * 0.02, 0.4)}s both`,
                  }}
                >
                  {/* Header: Sender and Time */}
                  <div className="flex items-center gap-1.5 mb-1 px-1.5 text-[11px] text-slate-400 dark:text-slate-500 select-none font-semibold">
                    <span className="text-slate-500 dark:text-slate-450 font-bold">You</span>
                    <span>•</span>
                    <time>{formatMessageTime(message.createdAt)}</time>
                    {message.isPinned && <span className="ml-1 text-amber-500">📌 Pinned</span>}
                  </div>

                  {/* Bubble Row */}
                  <div className="flex gap-2 items-end justify-end group/bubble w-full max-w-[70%]">
                    {/* Message Bubble */}
                    <div
                      className="flex flex-col hover:cursor-pointer select-text px-4 py-2.5 rounded-2xl rounded-tr-none bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-sm hover:brightness-[0.98] transition-all no-callout"
                      onTouchStart={(e) => { e.stopPropagation(); handleLongPressStart(message._id); }}
                      onTouchEnd={handleLongPressEnd}
                      onTouchMove={handleLongPressEnd}
                    >
                      {message.text && (
                        <p className="text-[14px] leading-relaxed break-words font-medium">
                          {message.text}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Read Status checkmark indicators */}
                  <div className="px-1.5 mt-1 text-[10px] text-slate-450 dark:text-slate-500 flex items-center gap-1 select-none font-bold">
                    <CheckCheck size={11} className="text-blue-500 dark:text-blue-400" />
                    <span>Read</span>
                  </div>
                </div>
              );
            } else {
              // Received message layout (aligned to left, with avatar)
              return (
                <div
                  key={message._id}
                  ref={index === activeMessages.length - 1 ? messageEndRef : null}
                  className="flex gap-3 items-start w-full message-item group/msg"
                  style={{
                    animation: `slideIn 0.28s ease-out ${Math.min(index * 0.02, 0.4)}s both`,
                  }}
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0 mt-0.5 select-none">
                    <div className="size-10 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 flex items-center justify-center">
                      <img
                        src={message.senderPic || selectedUser.profilePic || "/avatar.png"}
                        alt={message.senderName || selectedUser.fullName}
                        className="size-10 object-cover"
                      />
                    </div>
                  </div>

                  {/* Content block */}
                  <div className="flex flex-col items-start max-w-[70%]">
                    {/* Header: Sender and Time */}
                    <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-slate-400 dark:text-slate-550 select-none font-semibold">
                      <span className="font-bold text-slate-700 dark:text-slate-300">{message.senderName || selectedUser.fullName}</span>
                      <span>•</span>
                      <time>{isMockGroup ? "12:00 PM" : formatMessageTime(message.createdAt)}</time>
                    </div>

                    {/* Bubble Row */}
                    <div className="flex gap-2 items-end group/bubble w-full">
                      {/* Poll View OR Standard Message Bubble */}
                      {message.isPoll ? (
                        <div className="space-y-2.5 w-full bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 p-4 rounded-2xl rounded-tl-none shadow-sm max-w-xs">
                          <div className="font-bold text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                            📊 Group Poll
                          </div>
                          <div className="space-y-2">
                            {message.options.map((opt, idx) => {
                              const pct = opt.percent !== undefined ? opt.percent : opt.votes;
                              return (
                                <button
                                  key={idx}
                                  onClick={() => handlePollVote(message._id, idx)}
                                  className="w-full text-left relative overflow-hidden px-3.5 py-2.5 rounded-xl border border-slate-150 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-all select-none"
                                >
                                  {/* Progress bar background slider */}
                                  <div
                                    className="absolute left-0 top-0 bottom-0 bg-blue-500/10 dark:bg-blue-500/20 transition-all duration-300"
                                    style={{ width: `${pct}%` }}
                                  />
                                  <div className="relative flex justify-between items-center text-xs font-semibold text-slate-800 dark:text-slate-100">
                                    <div className="flex items-center gap-2.5">
                                      <div className={`size-4 rounded-full border flex items-center justify-center ${opt.selected ? "border-blue-500 bg-blue-500 text-white" : "border-slate-350 dark:border-slate-650"}`}>
                                        {opt.selected && <Check size={10} />}
                                      </div>
                                      <span>{opt.text}</span>
                                    </div>
                                    <span className="font-bold text-slate-700 dark:text-slate-300">{pct}%</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div
                          className="flex flex-col hover:cursor-pointer select-text px-4 py-2.5 rounded-2xl rounded-tl-none bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-750/80 transition-all border border-slate-200/50 dark:border-slate-700/50 shadow-sm no-callout"
                          onTouchStart={(e) => { e.stopPropagation(); handleLongPressStart(message._id); }}
                          onTouchEnd={handleLongPressEnd}
                          onTouchMove={handleLongPressEnd}
                        >
                          {message.text && (
                            <p className="text-[14px] leading-relaxed break-words font-medium text-slate-850 dark:text-slate-150">
                              {message.text}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* High Fidelity Reactions Display directly attached at bottom */}
                    {message.reactions && (
                      <div className="flex gap-1 mt-1.5 px-1 select-none">
                        {Object.entries(message.reactions).map(([emoji, count]) => (
                          <div 
                            key={emoji}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-50 dark:bg-slate-850 border border-slate-150 dark:border-slate-700/80 text-[10px] font-extrabold rounded-full shadow-sm"
                          >
                            <span>{emoji}</span>
                            <span className="text-slate-400 dark:text-slate-500 font-bold">{count}</span>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                </div>
              );
            }
          })}

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
      `}</style>
    </div>
  );
};

export default ChatContainer;
