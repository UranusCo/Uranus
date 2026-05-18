import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, MessageCircle } from "lucide-react";
import UranusLogo from "../../public/uranus.svg";
import { useState } from "react";
import StatusUpdateModal from "./StatusUpdateModal";
import NotificationBell from "./NotificationBell";


const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [showStatusModal, setShowStatusModal] = useState(false);

  return (
    <>
      {showStatusModal && (
        <StatusUpdateModal onClose={() => setShowStatusModal(false)} />
      )}
      
      <header
        className="bg-white/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 fixed w-full top-0 z-40 backdrop-blur-md transition-colors duration-200"
      >
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                <div className="size-9 rounded-lg bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center overflow-hidden">
                  <img src={UranusLogo} alt="Uranus Logo" className="w-5 h-5 object-contain" />
                </div>
                <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">Uranus</h1>
              </Link>
            </div>

            <div className="flex items-center gap-2.5">
              {authUser && (
                <>
                  <button
                    onClick={() => setShowStatusModal(true)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-xl font-medium flex items-center gap-2 transition-all active:scale-[0.98]"
                    title="Update status"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">Status</span>
                  </button>

                  <NotificationBell />
                </>
              )}
              
              <Link
                to={"/settings"}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-xl font-medium flex items-center gap-2 transition-all active:scale-[0.98]"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>

              {authUser && (
                <>
                  <Link 
                    to={"/profile"} 
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-xl font-medium flex items-center gap-2 transition-all active:scale-[0.98]"
                  >
                    <User className="size-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>

                  <button 
                    className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-sm rounded-xl font-medium flex items-center gap-2 transition-all active:scale-[0.98]" 
                    onClick={logout}
                  >
                    <LogOut className="size-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Navbar;
