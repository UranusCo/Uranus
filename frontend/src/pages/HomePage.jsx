import { useChatStore } from "../store/useChatStore";

import SidebarRail from "../components/SidebarRail";
import ConversationList from "../components/ConversationList";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-[100dvh] bg-slate-100/60 dark:bg-zinc-950/60 flex flex-col overflow-hidden">
      {/* Spacer for fixed navbar on mobile */}
      <div className="h-16 flex-shrink-0 lg:hidden" />

      {/* 3-Section Layout */}
      <div className="flex flex-1 h-full overflow-hidden w-full relative">
        {/* Section 1: SidebarRail (Far Left) - desktop only */}
        <SidebarRail />

        {/* Section 2: ConversationList (Middle) */}
        {/* Full-width on mobile when no chat is selected, hidden when chat is open */}
        <div
          className={`
            flex-shrink-0 h-full
            ${selectedUser ? "hidden lg:flex" : "flex w-full"}
            lg:w-auto
          `}
        >
          <ConversationList />
        </div>

        {/* Section 3: ChatArea (Right Card Panel) */}
        {/* Full-width on mobile when chat is selected, hidden on mobile when no chat is selected */}
        <div
          className={`
            flex-1 min-w-0 h-full
            ${!selectedUser ? "hidden lg:flex" : "flex"}
            lg:p-4 bg-slate-100/65 dark:bg-zinc-950/60
          `}
        >
          <div className="flex-1 h-full w-full bg-base-100 dark:bg-zinc-900 rounded-none lg:rounded-[24px] lg:shadow-sm lg:border lg:border-base-200/50 overflow-hidden flex flex-col">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
