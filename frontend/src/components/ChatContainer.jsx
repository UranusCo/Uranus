import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState, useCallback } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import MessageItem from "./MessageItem";
import MessageActions from "./MessageActions";
import MessageSearch from "./MessageSearch";
import ReplyPreview from "./ReplyPreview";
import EditingIndicator from "./EditingIndicator";
import MessageVirtualizer from "./MessageVirtualizer";

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

const ChatContainer = ({ onBurgerClick }) => {
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
  const longPressRef = useRef(null);
  const ignoreNextClickRef = useRef(false);

  const [showSearch, setShowSearch] = useState(false);
  const [showPinned, setShowPinned] = useState(false);
  const [activeMessageMenu, setActiveMessageMenu] = useState(null);
  const [messageMenuPos, setMessageMenuPos] = useState({ top: 0, left: 0 });
  const [loadingMore, setLoadingMore] = useState(false);

  const openMessageMenu = (messageId, buttonRect) => {
    const menuHeight = 270;
    const menuWidth = 220;
    const offset = 8;

    let top = buttonRect.top;
    if (top + menuHeight > window.innerHeight) {
      top = Math.max(offset, window.innerHeight - menuHeight - offset);
    }

    let left;
    if (buttonRect.left > window.innerWidth / 2) {
      left = buttonRect.left - menuWidth - offset;
    } else {
      left = buttonRect.left + buttonRect.width + offset;
    }

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

  const renderItem = useCallback((message, index) => {
    if (message.isTyping) {
      return (
        <div className="max-w-[800px] w-full mx-auto px-3 sm:px-5 py-3">
          <div className="flex gap-3 items-start w-full message-item">
            <div className="flex-shrink-0 mt-0.5">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="size-10 rounded-full object-cover shadow-soft border border-border dark:border-border-dark"
              />
            </div>
            <div className="flex flex-col items-start max-w-[85%] sm:max-w-[60%]">
              <div className="flex items-center gap-1.5 mb-1 px-1.5 text-[11px] text-slate-500 font-semibold">
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedUser.fullName}</span>
                <span>•</span>
                <span className="text-primary font-bold animate-pulse">Typing</span>
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-soft flex items-center justify-center border border-border dark:border-border-dark">
                <div className="typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const showDateSeparator = index === 0 || !isSameDay(message.createdAt, messages[index - 1].createdAt);

    return (
      <div className="max-w-[800px] w-full mx-auto px-3 sm:px-5 py-0.5">
        {showDateSeparator && (
          <div className="date-separator">
            <span>{formatDateLabel(message.createdAt)}</span>
          </div>
        )}
        <MessageItem
          message={message}
          index={index}
          messagesLength={messages.length}
          messages={messages}
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
    );
  }, [messages, selectedUser, activeMessageMenu, openMessageMenu, closeMessageMenu, handleLongPressStart, handleLongPressEnd, addReaction, removeReaction, markViewOnceOpened]);

  useEffect(() => {
    getMessages(selectedUser._id);
    getPinnedMessages(selectedUser._id);
  }, [selectedUser._id, getMessages, getPinnedMessages]);

  const handleScrollToTop = async () => {
    if (loadingMore || !isMoreMessagesAvailable) return;
    setLoadingMore(true);
    await getMessages(selectedUser._id, true);
    setLoadingMore(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!selectedUser?._id) return;
      if (e.ctrlKey && e.key.toLowerCase() === "k") { e.preventDefault(); setShowSearch((s) => !s); }
      if (e.ctrlKey && e.key.toLowerCase() === "m") { e.preventDefault(); toggleMuteChat(selectedUser._id); }
      if (e.ctrlKey && e.key.toLowerCase() === "p") { e.preventDefault(); togglePinChat(selectedUser._id); }
      if (e.ctrlKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        const lastOwn = [...messages].reverse().find((msg) => msg.senderId === authUser._id && !msg.isDeleted);
        if (lastOwn) setEditingMessage(lastOwn._id);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [messages, selectedUser, authUser, toggleMuteChat, togglePinChat, setEditingMessage]);

  if (isMessagesLoading && messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col h-full bg-background dark:bg-background-dark transition-colors duration-200">
        <ChatHeader onBurgerClick={onBurgerClick} />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  const virtualItems = [
    ...messages,
    ...(typingUsers.length > 0 ? [{ _id: "typing-indicator", isTyping: true }] : [])
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-background dark:bg-background-dark transition-colors duration-200">
      <ChatHeader
        onSearchClick={() => setShowSearch(!showSearch)}
        onPinnedClick={() => setShowPinned(!showPinned)}
        onBurgerClick={onBurgerClick}
      />

      {showSearch && (
        <div className="flex-shrink-0">
          <MessageSearch userId={selectedUser._id} onClose={() => setShowSearch(false)} />
        </div>
      )}

      {showPinned && (
        <div className="bg-surface dark:bg-surface-dark border-b border-border dark:border-border-dark p-4 max-h-48 overflow-y-auto flex-shrink-0 z-20 shadow-soft transition-colors duration-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Pinned Messages ({pinnedMessages.length})</h3>
            <button
              onClick={() => setShowPinned(false)}
              className="size-5 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors text-xs font-semibold"
            >
              ✕
            </button>
          </div>
          {pinnedMessages.length > 0 ? (
            <div className="space-y-2">
              {pinnedMessages.map((msg) => (
                <div
                  key={msg._id}
                  className="p-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-sm truncate cursor-pointer transition-colors text-slate-700 dark:text-slate-300 border border-border dark:border-border-dark"
                >
                  <p className="truncate font-medium">{msg.text || "[Media]"}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-xs text-slate-500 py-4 font-semibold">No pinned messages</p>
          )}
        </div>
      )}

      <div 
        className="flex-1 overflow-hidden select-text chat-bg-pattern relative"
        onClick={() => {
          if (ignoreNextClickRef.current) { ignoreNextClickRef.current = false; return; }
          if (activeMessageMenu) setActiveMessageMenu(null);
        }}
      >
        <MessageVirtualizer
          items={virtualItems}
          renderItem={renderItem}
          onScrollToTop={handleScrollToTop}
          isMoreAvailable={isMoreMessagesAvailable}
          isLoadingMore={loadingMore}
        />
      </div>

      <ReplyPreview />
      <EditingIndicator />

      <div className="flex-shrink-0">
        <MessageInput />
      </div>

      {activeMessageMenu && (
        <div 
          className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-[2px] transition-all" 
          onClick={closeMessageMenu} 
        />
      )}

      {activeMenuMessage && (
        <div
          className="fixed z-[9999] select-none bg-surface dark:bg-surface-dark rounded-2xl shadow-2xl border border-border dark:border-border-dark overflow-hidden animate-fadeIn mobile-bottom-sheet"
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
