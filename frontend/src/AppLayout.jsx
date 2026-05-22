import SidebarRail from "./components/SidebarRail";
import ConversationList from "./components/ConversationList";
import ChatContainer from "./components/ChatContainer";
import NoChatSelected from "./components/NoChatSelected";
import { useChatStore } from "./store/useChatStore";

const AppLayout = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background dark:bg-background-dark text-slate-900 dark:text-slate-100">
      {/* 1. Sidebar Rail */}
      <SidebarRail />
      
      {/* 2. Conversation List */}
      <div className={`w-full md:w-80 flex-shrink-0 border-r border-border dark:border-border-dark flex flex-col h-full bg-surface dark:bg-surface-dark ${selectedUser ? "hidden md:flex" : "flex"}`}>
        <ConversationList />
      </div>
      
      {/* 3. Chat Area */}
      <main className={`flex-1 flex-col h-full relative overflow-hidden bg-background dark:bg-background-dark ${selectedUser ? "flex" : "hidden md:flex"}`}>
        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </main>
    </div>
  );
};

export default AppLayout;
