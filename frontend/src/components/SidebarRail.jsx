import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { 
  MessageSquare, 
  LayoutGrid, 
  Folder, 
  Bookmark, 
  Phone, 
  Video, 
  Users, 
  Settings, 
  LogOut, 
  MessageCircle 
} from "lucide-react";
import UranusLogo from "../../public/uranus.svg";
import StatusUpdateModal from "./StatusUpdateModal";
import NotificationBell from "./NotificationBell";

const SidebarRail = ({ activeTab = "chats", setActiveTab = () => {} }) => {
  const { logout, authUser } = useAuthStore();
  const [showStatusModal, setShowStatusModal] = useState(false);

  return (
    <>
      {showStatusModal && (
        <StatusUpdateModal onClose={() => setShowStatusModal(false)} />
      )}

      <aside className="hidden lg:flex flex-col items-center py-6 w-16 h-full bg-white dark:bg-slate-800 border-r border-slate-200/80 dark:border-slate-700/80 justify-between flex-shrink-0 z-30 select-none transition-colors duration-200">
        {/* Top: Brand Logo */}
        <div className="flex flex-col items-center gap-6 w-full">
          <Link to="/" className="hover:scale-105 transition-transform duration-200" onClick={() => setActiveTab("chats")}>
            <div className="size-11 rounded-2xl bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center overflow-hidden">
              <img src={UranusLogo} alt="Uranus Logo" className="w-6 h-6 object-contain" />
            </div>
          </Link>

          {/* Middle Navigation Group */}
          <div className="flex flex-col items-center gap-3 w-full px-2 mt-4">
            {/* Active Message Icon */}
            <button
              onClick={() => setActiveTab("chats")}
              className={`relative size-12 flex items-center justify-center rounded-2xl transition-all duration-200 group ${
                activeTab === "chats"
                  ? "bg-blue-500 text-white shadow-sm shadow-blue-500/20"
                  : "bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-400"
              }`}
              title="Messages"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="absolute left-[70px] bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">Messages</span>
            </button>

            <button
              onClick={() => setActiveTab("calls")}
              className={`relative size-12 flex items-center justify-center rounded-2xl transition-all duration-200 group ${
                activeTab === "calls"
                  ? "bg-blue-500 text-white shadow-sm shadow-blue-500/20"
                  : "bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-400"
              }`}
              title="Calls"
            >
              <Phone className="w-5 h-5" />
              <span className="absolute left-[70px] bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">Calls</span>
            </button>

            <button
              onClick={() => setActiveTab("status")}
              className={`relative size-12 flex items-center justify-center rounded-2xl transition-all duration-200 group ${
                activeTab === "status"
                  ? "bg-blue-500 text-white shadow-sm shadow-blue-500/20"
                  : "bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-400"
              }`}
              title="Status Updates"
            >
              <Video className="w-5 h-5" />
              <span className="absolute left-[70px] bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">Status Updates</span>
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`relative size-12 flex items-center justify-center rounded-2xl transition-all duration-200 group ${
                activeTab === "users"
                  ? "bg-blue-500 text-white shadow-sm shadow-blue-500/20"
                  : "bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-500 dark:text-slate-400"
              }`}
              title="Users"
            >
              <Users className="w-5 h-5" />
              <span className="absolute left-[70px] bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">Users</span>
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col items-center gap-4 w-full px-2 mt-auto">
          {/* Status Modal Trigger */}
          <button 
            onClick={() => setShowStatusModal(true)}
            className="relative size-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-all duration-200 group" 
            title="Update Status"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="absolute left-[70px] bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">Update Status</span>
          </button>

          {/* Notifications */}
          <div className="relative size-10 flex items-center justify-center rounded-xl transition-all duration-200">
            <NotificationBell hideText={true} dropdownClass="left-14 bottom-0 origin-bottom-left" />
          </div>

          {/* User Profile Avatar Link */}
          {authUser && (
            <Link 
              to="/profile" 
              className="relative rounded-full ring-2 ring-blue-500/20 hover:ring-blue-500 dark:ring-blue-400/20 dark:hover:ring-blue-400 transition-all duration-200 overflow-hidden size-10 flex-shrink-0"
              title="View Profile"
            >
              <img 
                src={authUser.profilePic || "/avatar.png"} 
                alt="profile" 
                className="w-full h-full object-cover"
              />
            </Link>
          )}

          {/* Settings Page Link */}
          <Link 
            to="/settings" 
            className="relative size-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-all duration-200 group" 
            title="Settings"
          >
            <Settings className="w-4.5 h-4.5" />
            <span className="absolute left-[70px] bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">Settings</span>
          </Link>

          {/* Logout Action */}
          <button 
            onClick={logout}
            className="relative size-10 flex items-center justify-center rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-all duration-200 group" 
            title="Logout"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span className="absolute left-[70px] bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default SidebarRail;
