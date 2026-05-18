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

const SidebarRail = () => {
  const { logout, authUser } = useAuthStore();
  const [showStatusModal, setShowStatusModal] = useState(false);

  return (
    <>
      {showStatusModal && (
        <StatusUpdateModal onClose={() => setShowStatusModal(false)} />
      )}

      <aside className="hidden lg:flex flex-col items-center py-6 w-[70px] h-full bg-base-100 border-r border-base-200/80 justify-between flex-shrink-0 z-30 select-none">
        {/* Top: Brand Logo */}
        <div className="flex flex-col items-center gap-6 w-full">
          <Link to="/" className="hover:scale-105 transition-transform duration-200">
            <div className="size-11 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden">
              <img src={UranusLogo} alt="Uranus Logo" className="w-6 h-6 object-contain" />
            </div>
          </Link>

          {/* Middle Navigation Group */}
          <div className="flex flex-col items-center gap-3 w-full px-2 mt-4">
            <button className="relative size-12 flex items-center justify-center rounded-2xl bg-base-200/50 hover:bg-base-200 text-base-content/60 transition-all duration-200 group" title="Dashboard">
              <LayoutGrid className="w-5 h-5" />
              <span className="absolute left-[80px] bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">Dashboard</span>
            </button>

            <button className="relative size-12 flex items-center justify-center rounded-2xl bg-base-200/50 hover:bg-base-200 text-base-content/60 transition-all duration-200 group" title="Files">
              <Folder className="w-5 h-5" />
              <span className="absolute left-[80px] bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">Files</span>
            </button>

            <button className="relative size-12 flex items-center justify-center rounded-2xl bg-base-200/50 hover:bg-base-200 text-base-content/60 transition-all duration-200 group" title="Bookmarks">
              <Bookmark className="w-5 h-5" />
              <span className="absolute left-[80px] bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">Bookmarks</span>
            </button>

            <button className="relative size-12 flex items-center justify-center rounded-2xl bg-base-200/50 hover:bg-base-200 text-base-content/60 transition-all duration-200 group" title="Calls">
              <Phone className="w-5 h-5" />
              <span className="absolute left-[80px] bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">Calls</span>
            </button>

            {/* Active Message Icon */}
            <Link to="/" className="relative size-12 flex items-center justify-center rounded-2xl bg-primary text-primary-content shadow-lg shadow-primary/20 transition-all duration-200 group" title="Messages">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute left-[80px] bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">Messages</span>
            </Link>

            <button className="relative size-12 flex items-center justify-center rounded-2xl bg-base-200/50 hover:bg-base-200 text-base-content/60 transition-all duration-200 group" title="Video Calls">
              <Video className="w-5 h-5" />
              <span className="absolute left-[80px] bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">Video Calls</span>
            </button>

            <button className="relative size-12 flex items-center justify-center rounded-2xl bg-base-200/50 hover:bg-base-200 text-base-content/60 transition-all duration-200 group" title="Users">
              <Users className="w-5 h-5" />
              <span className="absolute left-[80px] bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">Users</span>
            </button>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col items-center gap-4 w-full px-2 mt-auto">
          {/* Status Modal Trigger */}
          <button 
            onClick={() => setShowStatusModal(true)}
            className="relative size-10 flex items-center justify-center rounded-xl bg-base-200/50 hover:bg-base-200 text-base-content/75 transition-all duration-200 group" 
            title="Update Status"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="absolute left-[80px] bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">Update Status</span>
          </button>

          {/* Notifications */}
          <div className="relative size-10 flex items-center justify-center rounded-xl bg-base-200/50 hover:bg-base-200 transition-all duration-200">
            <NotificationBell />
          </div>

          {/* User Profile Avatar Link */}
          {authUser && (
            <Link 
              to="/profile" 
              className="relative rounded-full ring-2 ring-primary/20 hover:ring-primary transition-all duration-200 overflow-hidden size-10 flex-shrink-0"
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
            className="relative size-10 flex items-center justify-center rounded-xl bg-base-200/50 hover:bg-base-200 text-base-content/75 transition-all duration-200 group" 
            title="Settings"
          >
            <Settings className="w-4.5 h-4.5" />
            <span className="absolute left-[80px] bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">Settings</span>
          </Link>

          {/* Logout Action */}
          <button 
            onClick={logout}
            className="relative size-10 flex items-center justify-center rounded-xl bg-error/10 hover:bg-error/20 text-error transition-all duration-200 group" 
            title="Logout"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span className="absolute left-[80px] bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default SidebarRail;
