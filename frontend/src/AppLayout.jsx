import SidebarRail from "./components/SidebarRail";
import ConversationList from "./components/ConversationList";
import ChatContainer from "./components/ChatContainer";

const AppLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background dark:bg-background-dark text-slate-900 dark:text-slate-100">
      {/* 1. Sidebar Rail */}
      <SidebarRail />
      
      {/* 2. Conversation List */}
      <div className="w-80 flex-shrink-0 border-r border-border dark:border-border-dark hidden md:flex flex-col h-full bg-surface dark:bg-surface-dark">
        <ConversationList />
      </div>
      
      {/* 3. Chat Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden bg-background dark:bg-background-dark">
        <ChatContainer />
      </main>
    </div>
  );
};

export default AppLayout;
