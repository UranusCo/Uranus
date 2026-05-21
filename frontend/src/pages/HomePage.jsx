import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Link } from "react-router-dom";
import SidebarRail from "../components/SidebarRail";
import ConversationList from "../components/ConversationList";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import StatusUpdateModal from "../components/StatusUpdateModal";
import UsersPanel from "../components/UsersPanel";
import CallsView from "../components/CallsView";
import StatusView from "../components/StatusView";
import { 
  MessageSquare, 
  Phone, 
  Disc, 
  Settings, 
  Users
} from "lucide-react";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [activeTab, setActiveTab] = useState("chats"); // chats, calls, status, users
  const [showStatusModal, setShowStatusModal] = useState(false);

  return (
    <div className="h-[100dvh] bg-slate-50 dark:bg-slate-900 flex flex-col overflow-hidden transition-colors duration-200">
      
      {/* 3-Section Layout */}
      <div className={`flex flex-grow h-full overflow-hidden w-full relative ${!selectedUser ? "pt-16 lg:pt-0" : ""}`}>
        {/* Section 1: SidebarRail (Far Left) - desktop only */}
        <SidebarRail activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Section 2: ConversationList/Calls/Status (Middle) */}
        {/* Full-width on mobile when no chat is selected, hidden when chat is open */}
        <div
          className={`
            h-full flex-shrink-0 flex flex-col
            ${selectedUser ? "hidden lg:flex" : "flex w-full"}
            lg:w-[320px] border-r border-slate-200 dark:border-slate-800
          `}
        >
          <div className="flex-grow min-h-0">
            {activeTab === "chats" && <ConversationList />}
            {activeTab === "calls" && <CallsView />}
            {activeTab === "status" && (
              <StatusView onAddStatusClick={() => setShowStatusModal(true)} />
            )}
            {activeTab === "users" && (
              <UsersPanel setActiveTab={setActiveTab} />
            )}
          </div>

          {/* Sticky Mobile Bottom Navigation Bar (Hidden when chat is actively open) */}
          {!selectedUser && (
            <nav className="lg:hidden border-t border-slate-150 dark:border-slate-800 bg-white/95 dark:bg-slate-850/95 backdrop-blur-md px-6 py-2.5 flex items-center justify-between z-30 select-none transition-colors pb-safe">
              <button 
                onClick={() => setActiveTab("chats")}
                className={`flex flex-col items-center gap-1 transition-all ${
                  activeTab === "chats" ? "text-blue-500 scale-105" : "text-slate-400 hover:text-slate-500 dark:hover:text-slate-350"
                }`}
              >
                <MessageSquare size={19} className={activeTab === "chats" ? "fill-current" : ""} />
                <span className="text-[10px] font-bold">Chats</span>
              </button>
              
              <button 
                onClick={() => setActiveTab("users")}
                className={`flex flex-col items-center gap-1 transition-all ${
                  activeTab === "users" ? "text-blue-500 scale-105" : "text-slate-400 hover:text-slate-500 dark:hover:text-slate-350"
                }`}
              >
                <Users size={19} className={activeTab === "users" ? "fill-current" : ""} />
                <span className="text-[10px] font-bold">Users</span>
              </button>

              <button 
                onClick={() => setActiveTab("calls")}
                className={`flex flex-col items-center gap-1 transition-all ${
                  activeTab === "calls" ? "text-blue-500 scale-105" : "text-slate-400 hover:text-slate-500 dark:hover:text-slate-355"
                }`}
              >
                <Phone size={19} className={activeTab === "calls" ? "fill-current" : ""} />
                <span className="text-[10px] font-bold">Calls</span>
              </button>

              <button 
                onClick={() => setActiveTab("status")}
                className={`flex flex-col items-center gap-1 transition-all ${
                  activeTab === "status" ? "text-blue-500 scale-105" : "text-slate-400 hover:text-slate-500 dark:hover:text-slate-355"
                }`}
              >
                <Disc size={19} className={activeTab === "status" ? "fill-current animate-spin-slow" : ""} />
                <span className="text-[10px] font-bold">Status</span>
              </button>

              <Link 
                to="/settings"
                className="flex flex-col items-center gap-1 transition-all text-slate-400 hover:text-slate-500 dark:hover:text-slate-355"
              >
                <Settings size={19} />
                <span className="text-[10px] font-bold">Settings</span>
              </Link>
            </nav>
          )}
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

      {showStatusModal && (
        <StatusUpdateModal onClose={() => setShowStatusModal(false)} />
      )}
    </div>
  );
};

export default HomePage;
