import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User, MessageCircle } from "lucide-react";
import UranusLogo from "../../public/uranus.svg";
import { useState } from "react";
import StatusUpdateModal from "./StatusUpdateModal";


const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [showStatusModal, setShowStatusModal] = useState(false);

  return (
    <>
      {showStatusModal && (
        <StatusUpdateModal onClose={() => setShowStatusModal(false)} />
      )}
      
      <header
        className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
      backdrop-blur-lg bg-base-100/80"
      >
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
                  <img src={UranusLogo} alt="Uranus Logo" className="w-5 h-5 object-contain" />
                </div>
                <h1 className="text-lg font-bold">Uranus</h1>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              {authUser && (
                <button
                  onClick={() => setShowStatusModal(true)}
                  className="btn btn-sm gap-2 transition-colors"
                  title="Update status"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Status</span>
                </button>
              )}
              
              <Link
                to={"/settings"}
                className={`
                btn btn-sm gap-2 transition-colors
                
                `}
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>

              {authUser && (
                <>
                  <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                    <User className="size-5" />
                    <span className="hidden sm:inline">Profile</span>
                  </Link>

                  <button className="flex gap-2 items-center" onClick={logout}>
                    <LogOut className="size-5" />
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
