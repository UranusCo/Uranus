import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Phone, Video, Search, Bell, BellOff, X, FileText } from 'lucide-react';

const UserProfileModal = ({ open, onClose, user }) => {
  const [portalRoot, setPortalRoot] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    setPortalRoot(element);

    return () => {
      document.body.removeChild(element);
    };
  }, []);

  if (!open || !user || !portalRoot) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 transition-all duration-200">
      <div className="w-full max-w-md rounded-[32px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden animate-fadeIn max-h-[90vh] flex flex-col">
        
        {/* Top bar with back/close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-850 flex-shrink-0">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Contact Details
          </span>
          <button 
            className="p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-500 hover:text-slate-700 dark:text-slate-400 rounded-xl transition-all" 
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="flex-grow overflow-y-auto scrollbar-none">
          
          {/* Centered Avatar and Name Block */}
          <div className="flex flex-col items-center justify-center pt-8 pb-5 px-6 select-none">
            <div className="size-24 rounded-full border-4 border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <img 
                src={user.profilePic || "/avatar.png"} 
                alt={user.fullName || user.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <h3 className="font-extrabold text-xl text-slate-850 dark:text-slate-100 mt-4 leading-tight">
              {user.fullName || user.name}
            </h3>
            <p className="text-xs text-slate-450 dark:text-slate-500 mt-1.5 font-bold">
              {user.email || "Active Now"}
            </p>
          </div>

          {/* Quick Action Buttons Grid */}
          <div className="grid grid-cols-4 gap-2.5 px-6 mb-6">
            <button className="flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-150 dark:border-slate-800 rounded-2xl hover:scale-105 active:scale-95 transition-all text-slate-650 dark:text-slate-305">
              <Phone size={18} />
              <span className="text-[10px] font-extrabold mt-1.5 uppercase tracking-wider text-slate-450 dark:text-slate-500">Call</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-150 dark:border-slate-800 rounded-2xl hover:scale-105 active:scale-95 transition-all text-slate-650 dark:text-slate-305">
              <Video size={18} />
              <span className="text-[10px] font-extrabold mt-1.5 uppercase tracking-wider text-slate-450 dark:text-slate-500">Video</span>
            </button>
            <button className="flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-150 dark:border-slate-800 rounded-2xl hover:scale-105 active:scale-95 transition-all text-slate-650 dark:text-slate-355">
              <Search size={18} />
              <span className="text-[10px] font-extrabold mt-1.5 uppercase tracking-wider text-slate-450 dark:text-slate-500">Search</span>
            </button>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="flex flex-col items-center justify-center p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-150 dark:border-slate-800 rounded-2xl hover:scale-105 active:scale-95 transition-all text-slate-650 dark:text-slate-355"
            >
              {isMuted ? <BellOff size={18} className="text-rose-500" /> : <Bell size={18} />}
              <span className="text-[10px] font-extrabold mt-1.5 uppercase tracking-wider text-slate-450 dark:text-slate-500">
                {isMuted ? "Unmute" : "Mute"}
              </span>
            </button>
          </div>

          {/* Media, Links & Files Section */}
          <div className="px-6 mb-6">
            <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-widest mb-3">
              Media, Links & Files
            </h4>
            <div className="grid grid-cols-4 gap-2.5">
              <div className="aspect-square rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:scale-[1.03] transition-all">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=120" className="w-full h-full object-cover" alt="Media" />
              </div>
              <div className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-1.5 shadow-sm text-center hover:scale-[1.03] transition-all">
                <FileText size={18} className="text-blue-500 mb-1" />
                <span className="text-[8px] font-extrabold text-slate-550 dark:text-slate-400 truncate w-full">project.pdf</span>
              </div>
              <div className="aspect-square rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:scale-[1.03] transition-all">
                <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=120" className="w-full h-full object-cover" alt="Media" />
              </div>
              <div className="aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-extrabold text-xs text-slate-500 dark:text-slate-400 shadow-sm hover:scale-[1.03] transition-all select-none">
                +12
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="px-6 pb-6">
            <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-550 uppercase tracking-widest mb-3">
              Profile Details
            </h4>
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-50/50 dark:bg-slate-800/30 border border-slate-150 dark:border-slate-850 rounded-2xl">
                <p className="text-[9px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">About</p>
                <p className="text-xs font-bold text-slate-750 dark:text-slate-200 mt-1 leading-relaxed">
                  {user.about || 'Hey there! I am using Uranus.'}
                </p>
              </div>
              <div className="p-3.5 bg-slate-50/50 dark:bg-slate-800/30 border border-slate-150 dark:border-slate-850 rounded-2xl">
                <p className="text-[9px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">Joined Uranus</p>
                <p className="text-xs font-bold text-slate-750 dark:text-slate-200 mt-1">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : 'Recently'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>,
    portalRoot
  );
};

export default UserProfileModal;
