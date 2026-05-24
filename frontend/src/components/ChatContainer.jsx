import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState, useCallback } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import MessageItem from "./MessageItem";
import MessageVirtualizer from "./MessageVirtualizer";
import UserProfilePanel from "./UserProfilePanel";
import MessageActions from "./MessageActions";
import ChatActionDrawer from "./ChatActionDrawer";

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
    isLoadingMoreMessages,
    selectedUser,
    typingUsers,
    addReaction,
    removeReaction,
    markViewOnceOpened,
    isMoreMessagesAvailable,
    chatSettings,
    lockedChats,
    setChatExpiry,
    lockChat,
    unlockChat,
  } = useChatStore();
  const [showProfile, setShowProfile] = useState(false);
  const [showActionDrawer, setShowActionDrawer] = useState(false);
  const [activeMessageMenu, setActiveMessageMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const openMessageMenu = useCallback((messageId, position) => {
    const menuHeight = 270;
    const menuWidth = 220;
    const offset = 8;
    
    let top, left;

    if (position.top !== undefined && position.left !== undefined && position.width === undefined) {
      // Point-based positioning (from right click)
      top = position.top;
      left = position.left;
    } else {
      // Rect-based positioning (from chevron button)
      top = position.top;
      left = position.left > window.innerWidth / 2 ? position.left - menuWidth - offset : position.left + position.width + offset;
    }

    // Viewport containment
    if (top + menuHeight > window.innerHeight) top = Math.max(offset, window.innerHeight - menuHeight - offset);
    if (left < offset) left = offset;
    if (left + menuWidth > window.innerWidth - offset) left = window.innerWidth - menuWidth - offset;
    
    setMenuPosition({ top, left });
    setActiveMessageMenu(messageId);
  }, []);

  const closeMessageMenu = () => setActiveMessageMenu(null);

  const renderItem = useCallback((message, index) => {
    if (message.isTyping) {
      return (
        <div className="max-w-[800px] w-full mx-auto px-4 py-2">
          <div className="flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="size-9 rounded-full bg-slate-200 dark:bg-slate-800 flex-shrink-0 shadow-sm" aria-label="Typing...">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/10 animate-pulse" />
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-surface dark:bg-surface-dark border border-border dark:border-border-dark shadow-soft">
               <div className="flex gap-1.5 items-center">
                 <span className="size-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
                 <span className="size-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
                 <span className="size-2 rounded-full bg-slate-400 animate-bounce" />
               </div>
            </div>
          </div>
        </div>
      );
    }

    const showDateSeparator = index === 0 || !isSameDay(message.createdAt, messages[index - 1]?.createdAt);

    return (
      <div className="max-w-[800px] w-full mx-auto px-4 py-0.5">
        {showDateSeparator && (
          <div className="flex justify-center my-6">
            <span className="px-3 py-1 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest backdrop-blur-sm">
              {formatDateLabel(message.createdAt)}
            </span>
          </div>
        )}
        <MessageItem
          message={message}
          index={index}
          messagesLength={messages.length}
          messages={messages}
          selectedUser={selectedUser}
          activeMessageMenu={activeMessageMenu}
          openMessageMenu={openMessageMenu}
          closeMessageMenu={closeMessageMenu}
          addReaction={addReaction}
          removeReaction={removeReaction}
          markViewOnceOpened={markViewOnceOpened}
        />
      </div>
    );
  }, [messages, selectedUser, activeMessageMenu, openMessageMenu, addReaction, removeReaction, markViewOnceOpened]);

  const loadMoreMessages = () => {
    if (selectedUser?._id && isMoreMessagesAvailable && !isLoadingMoreMessages) {
      getMessages(selectedUser._id, true);
    }
  };

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages]);


  if (isMessagesLoading && messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col h-full bg-background dark:bg-background-dark">
        <ChatHeader 
          onAvatarClick={() => setShowProfile(true)} 
          onMoreClick={() => setShowActionDrawer(true)}
        />
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
    <div className="flex-1 flex flex-col h-full bg-background dark:bg-background-dark overflow-hidden relative transition-colors duration-200">
      <ChatHeader 
        onAvatarClick={() => setShowProfile(true)} 
        onMoreClick={() => setShowActionDrawer(true)}
      />

      <div className="flex-1 overflow-hidden chat-bg-pattern relative">
        <MessageVirtualizer
          items={virtualItems}
          renderItem={renderItem}
          onScrollToTop={loadMoreMessages}
          isMoreAvailable={isMoreMessagesAvailable}
          isLoadingMore={isLoadingMoreMessages}
        />
      </div>

      <MessageInput />

      <UserProfilePanel 
        user={selectedUser} 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
      />

      <ChatActionDrawer 
        open={showActionDrawer}
        onClose={() => setShowActionDrawer(false)}
        selectedUser={selectedUser}
        chatSettings={chatSettings}
        lockedChats={lockedChats}
        setChatExpiry={setChatExpiry}
        lockChat={lockChat}
        unlockChat={unlockChat}
      />

      {activeMessageMenu && (
        <>
          <div className="fixed inset-0 z-[9998] bg-black/5 backdrop-blur-[1px]" onClick={closeMessageMenu} />
          <div 
            className="fixed z-[9999] animate-in fade-in zoom-in-95 duration-100"
            style={{ 
              top: menuPosition.top, 
              left: menuPosition.left,
            }}
          >
            <MessageActions 
              message={messages.find(m => m._id === activeMessageMenu)} 
              onClose={closeMessageMenu} 
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatContainer;
