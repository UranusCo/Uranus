import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState, useCallback } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import MessageItem from "./MessageItem";
import MessageSearch from "./MessageSearch";
import MessageVirtualizer from "./MessageVirtualizer";
import UserProfilePanel from "./UserProfilePanel";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, isMoreMessagesAvailable } = useChatStore();
  const [showProfile, setShowProfile] = useState(false);
  const messageEndRef = useRef(null);

  const renderItem = useCallback((message, index) => {
    return (
      <div className="max-w-[800px] w-full mx-auto px-4 py-1">
        <MessageItem message={message} index={index} />
      </div>
    );
  }, []);

  if (isMessagesLoading && messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col h-full bg-background dark:bg-background-dark">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-background dark:bg-background-dark overflow-hidden relative">
      <ChatHeader onAvatarClick={() => setShowProfile(true)} />

      <div className="flex-1 overflow-y-auto chat-bg-pattern p-4 space-y-4">
        <MessageVirtualizer
          items={messages}
          renderItem={renderItem}
          isMoreAvailable={isMoreMessagesAvailable}
        />
        <div ref={messageEndRef} />
      </div>

      <div className="p-4 bg-surface dark:bg-surface-dark border-t border-border dark:border-border-dark">
        <MessageInput />
      </div>

      <UserProfilePanel 
        user={selectedUser} 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
      />
    </div>
  );
};

export default ChatContainer;
