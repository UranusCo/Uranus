import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Link } from "react-router-dom";
import SidebarRail from "../components/SidebarRail";
import ConversationList from "../components/ConversationList";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import StatusUpdateModal from "../components/StatusUpdateModal";
import UsersPanel from "../components/UsersPanel";
import { 
  MessageSquare, 
  Phone, 
  Disc, 
  Settings, 
  Video, 
  PhoneCall, 
  ArrowUpRight, 
  ArrowDownLeft,
  Users
} from "lucide-react";

// Sleek high-fidelity mockup view for call logs
const CallsView = () => {
  const mockCalls = [
    { name: "Bagus Pambudi", time: "12 mins ago", type: "voice", direction: "incoming", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80" },
    { name: "Dajeng Septi", time: "1h ago", type: "video", direction: "outgoing", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80" },
    { name: "Larry Abraham", time: "Yesterday", type: "voice", direction: "missed", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80" },
  ];

  return (
    <div className="h-full w-full bg-white dark:bg-slate-800 flex flex-col transition-all duration-200 border-r border-slate-200 dark:border-slate-700 select-none animate-fadeIn">
      {/* Top Header */}
      <div className="px-5 pt-6 pb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-slate-850 dark:text-slate-100 tracking-tight">Calls</h1>
      </div>

      {/* List */}
      <div className="flex-grow overflow-y-auto px-5 space-y-3 pb-6">
        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Recent Calls</p>
        
        {mockCalls.map((call, idx) => (
          <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50/60 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-850 rounded-2xl hover:scale-[1.01] transition-transform">
            <div className="flex items-center gap-3">
              <img src={call.avatar} className="size-11 rounded-full object-cover border border-slate-100 dark:border-slate-700" alt={call.name} />
              <div>
                <p className="text-sm font-bold text-slate-850 dark:text-slate-100">{call.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-400 dark:text-slate-550 font-bold">
                  {call.direction === "incoming" && <ArrowDownLeft size={13} className="text-emerald-500" />}
                  {call.direction === "outgoing" && <ArrowUpRight size={13} className="text-blue-500" />}
                  {call.direction === "missed" && <ArrowDownLeft size={13} className="text-rose-500" />}
                  <span>{call.time}</span>
                </div>
              </div>
            </div>
            <button className="size-9 bg-slate-100 dark:bg-slate-850 flex items-center justify-center rounded-xl text-slate-500 hover:text-blue-500 transition-colors">
              {call.type === "video" ? <Video size={15} /> : <PhoneCall size={15} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Sleek high-fidelity mockup view for status stories feed
const StatusView = ({ onAddStatusClick }) => {
  const mockStories = [
    { name: "Bayu Aji", time: "Just now", text: "Working on new designs...", color: "from-purple-500 to-indigo-500" },
    { name: "Dajeng Septi", time: "45 mins ago", text: "Sunny day! ☀️", color: "from-amber-400 to-orange-500" },
    { name: "Larry Abraham", time: "2h ago", text: "Coding all night.", color: "from-blue-500 to-teal-400" },
  ];

  return (
    <div className="h-full w-full bg-white dark:bg-slate-800 flex flex-col transition-all duration-200 border-r border-slate-200 dark:border-slate-700 select-none animate-fadeIn">
      {/* Top Header */}
      <div className="px-5 pt-6 pb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-slate-850 dark:text-slate-100 tracking-tight">Status</h1>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-y-auto px-5 space-y-3 pb-6">
        {/* Self Status Card */}
        <div 
          onClick={onAddStatusClick}
          className="flex items-center justify-between p-3.5 bg-slate-50/60 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-850 rounded-2xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-850/40 transition-colors shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="relative size-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs select-none">
              You
            </div>
            <div>
              <p className="text-sm font-bold text-slate-850 dark:text-slate-105">My Status</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold mt-0.5">Tap to add status update</p>
            </div>
          </div>
          <button className="size-8 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-md font-extrabold text-sm">
            +
          </button>
        </div>

        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pt-2.5 mb-2">Recent Updates</p>
        
        {mockStories.map((story, idx) => (
          <div key={idx} className="flex items-center gap-3.5 p-3.5 bg-slate-50/60 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-850 rounded-2xl hover:scale-[1.01] transition-transform">
            <div className={`size-11 rounded-full bg-gradient-to-br ${story.color} flex items-center justify-center p-0.5 shadow-sm`}>
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                <span className="font-extrabold text-xs text-slate-700 dark:text-slate-350">{story.name.charAt(0)}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-855 dark:text-slate-100">{story.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-semibold italic">"{story.text}"</p>
              <p className="text-[9px] text-slate-400 dark:text-slate-500 font-extrabold mt-1.5 uppercase tracking-wider">{story.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [activeTab, setActiveTab] = useState("chats"); // chats, calls, status, users
  const [showStatusModal, setShowStatusModal] = useState(false);

  return (
    <div className="h-[100dvh] bg-slate-50 dark:bg-slate-900 flex flex-col overflow-hidden transition-colors duration-200">
      
      {/* 3-Section Layout */}
      <div className="flex flex-grow h-full overflow-hidden w-full relative">
        {/* Section 1: SidebarRail (Far Left) - desktop only */}
        <SidebarRail activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Section 2: ConversationList/Calls/Status (Middle) */}
        {/* Full-width on mobile when no chat is selected, hidden when chat is open */}
        <div
          className={`
            h-full flex-shrink-0 flex flex-col
            ${selectedUser ? "hidden lg:flex" : "flex w-full"}
            lg:w-[300px]
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
            <nav className="lg:hidden border-t border-slate-150 dark:border-slate-800 bg-white/95 dark:bg-slate-850/95 backdrop-blur-md px-6 py-2.5 flex items-center justify-between z-30 select-none transition-colors">
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
                  activeTab === "calls" ? "text-blue-500 scale-105" : "text-slate-400 hover:text-slate-500 dark:hover:text-slate-350"
                }`}
              >
                <Phone size={19} className={activeTab === "calls" ? "fill-current" : ""} />
                <span className="text-[10px] font-bold">Calls</span>
              </button>

              <button 
                onClick={() => setActiveTab("status")}
                className={`flex flex-col items-center gap-1 transition-all ${
                  activeTab === "status" ? "text-blue-500 scale-105" : "text-slate-400 hover:text-slate-500 dark:hover:text-slate-350"
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
