import { useChatStore } from "../store/useChatStore";

import SidebarRail from "../components/SidebarRail";
import ConversationList from "../components/ConversationList";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-[100dvh] bg-base-100 dark:bg-zinc-950 flex flex-col overflow-hidden">
      {/* Spacer for fixed navbar on mobile */}
      <div className="h-16 flex-shrink-0 lg:hidden" />

      {/* 3-Section Layout */}
      <div className="flex flex-grow h-full overflow-hidden w-full relative">
        {/* Section 1: SidebarRail (Far Left) - desktop only */}
        <SidebarRail />

        {/* Section 2: ConversationList (Middle) */}
        {/* Full-width on mobile when no chat is selected, hidden when chat is open */}
        <div
          className={`
            h-full flex-shrink-0
            ${selectedUser ? "hidden lg:flex" : "flex w-full"}
            lg:w-[300px]
          `}
        >
          <ConversationList />
        </div>

        {/* Section 3: ChatArea (Right Panel) */}
        {/* Full-width on mobile when chat is selected, hidden on mobile when no chat is selected */}
        <div
          className={`
            flex-grow h-full min-w-0 flex flex-col
            ${!selectedUser ? "hidden lg:flex" : "flex"}
          `}
        >
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
