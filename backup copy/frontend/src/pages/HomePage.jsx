import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-[100dvh] bg-base-200">
      {/* Spacer for fixed navbar on mobile */}
      <div className="h-16 flex-shrink-0 lg:hidden" />

      <div className="flex flex-col lg:flex lg:items-center lg:justify-center lg:pt-20 lg:px-4"
           style={{ height: 'calc(100dvh - 4rem)' }}>
        <div
          className="bg-base-100 w-full h-full overflow-hidden
                     lg:rounded-lg lg:shadow-cl lg:max-w-6xl lg:h-[calc(100vh-8rem)]"
        >
          <div className="flex h-full lg:rounded-lg overflow-hidden">
            {/* Sidebar: full-width on mobile when no chat selected, hidden when chat open */}
            <div
              className={`
                flex-shrink-0 h-full
                ${selectedUser ? "hidden lg:flex" : "flex w-full"}
                lg:w-auto
              `}
            >
              <Sidebar />
            </div>

            {/* Chat area: full-width on mobile when chat selected */}
            <div
              className={`
                flex-1 min-w-0
                ${!selectedUser ? "hidden lg:flex" : "flex"}
              `}
            >
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
