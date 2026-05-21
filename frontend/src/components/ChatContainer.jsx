import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import MessageItem from "./MessageItem";
import MessageActions from "./MessageActions";
import MessageSearch from "./MessageSearch";
import ReplyPreview from "./ReplyPreview";
import EditingIndicator from "./EditingIndicator";
import { Loader } from "lucide-react";

const isSameDay = (d1, d2) => {
  const a = new Date(d1);
  const b = new Date(d2);
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
};

const formatDateLabel = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return date.toLocaleDateString("en-US", { weekday: "long" });
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    typingUsers,
    pinnedMessages,
    getPinnedMessages,
    setEditingMessage,
    addReaction,
    removeReaction,
    toggleMuteChat,
    togglePinChat,
    markViewOnceOpened,
    isMoreMessagesAvailable,
  } = useChatStore();
  
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const scrollRef = useRef(null);
  const loadingMoreRef = useRef(false);
  const topSentinelRef = useRef(null);
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
  }, [selectedUser._id, getMessages, getPinnedMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages && !loadingMoreRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && isMoreMessagesAvailable && !loadingMoreRef.current && messages.length > 0) {
          loadingMoreRef.current = true;
          const scrollContainer = scrollRef.current;
          const oldScrollHeight = scrollContainer.scrollHeight;
          const oldScrollTop = scrollContainer.scrollTop;

          await getMessages(selectedUser._id, true);
          
          // Restore scroll position after prepending messages
          if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight - oldScrollHeight + oldScrollTop;
          }
          loadingMoreRef.current = false;
        }
      },
      { threshold: 0.1 }
    );

    if (topSentinelRef.current) observer.observe(topSentinelRef.current);

    return () => observer.disconnect();
  }, [selectedUser._id, isMoreMessagesAvailable, messages.length, getMessages]);

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

  if (isMessagesLoading && messages.length === 0) {
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
        className="flex-1 overflow-y-auto px-3 sm:px-5 py-3 message-container select-text chat-bg-pattern"
        ref={scrollRef}
        onClick={() => {
          if (ignoreNextClickRef.current) { ignoreNextClickRef.current = false; return; }
          if (activeMessageMenu) setActiveMessageMenu(null);
        }}
      >
        <div className="max-w-[800px] w-full mx-auto">
          {/* Scroll Sentinel */}
          <div ref={topSentinelRef} className="h-1" />
          
          {isMoreMessagesAvailable && messages.length > 0 && (
            <div className="flex justify-center py-3">
              <Loader size={16} className="animate-spin text-blue-500" />
            </div>
          )}

          {messages.map((message, index) => {
            const showDateSeparator = index === 0 || !isSameDay(message.createdAt, messages[index - 1].createdAt);
            return (
              <div key={message._id} className={showDateSeparator ? "mt-1" : ""}>
                {showDateSeparator && (
                  <div className="date-separator">
                    <span>{formatDateLabel(message.createdAt)}</span>
                  </div>
                )}
                <div className={index > 0 && !showDateSeparator ? "mt-1" : ""}>
                  <MessageItem
                    message={message}
                    messages={messages}
                    index={index}
                    messagesLength={messages.length}
                    messageEndRef={messageEndRef}
                    selectedUser={selectedUser}
                    activeMessageMenu={activeMessageMenu}
                    openMessageMenu={openMessageMenu}
                    closeMessageMenu={closeMessageMenu}
                    handleLongPressStart={handleLongPressStart}
                    handleLongPressEnd={handleLongPressEnd}
                    addReaction={addReaction}
                    removeReaction={removeReaction}
                    markViewOnceOpened={markViewOnceOpened}
                  />
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {typingUsers.length > 0 && (
            <div className="flex gap-3 items-start w-full message-item">
              <div className="flex-shrink-0 mt-0.5">
                <img
                  src={selectedUser.profilePic || "/avatar.png"}
                  alt={selectedUser.fullName}
                  className="size-10 rounded-full object-cover shadow-sm border border-slate-200 dark:border-slate-700"
                />
              </div>
              <div className="flex flex-col items-start max-w-[85%] sm:max-w-[60%]">
                <div className="flex items-center gap-1.5 mb-1 px-1.5 text-[11px] text-slate-455 dark:text-slate-500 font-semibold">
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

      {/* Floating high-z-index Actions Context Menu Portal (escapes scrolling stack) */}
      {activeMessageMenu && (
        <div 
          className="fixed inset-0 z-[9998] bg-black/40 dark:bg-black/60 backdrop-blur-[2px] sm:bg-black/[0.04] sm:dark:bg-black/[0.12] sm:backdrop-blur-[0.5px] transition-all" 
          onClick={closeMessageMenu} 
        />
      )}

      {activeMenuMessage && (
        <div
          className="fixed z-[9999] select-none bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-150 dark:border-slate-700/80 overflow-hidden animate-fadeIn mobile-bottom-sheet"
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
