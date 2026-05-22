import { X, Search, MoreVertical, Download, ChevronLeft, Phone, Video, Menu } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import ExportChatModal from "./ExportChatModal";
import ChatPrivacyMenu from "./ChatPrivacyMenu";
import UserProfileModal from "./UserProfileModal";
import ChatInfoModal from "./ChatInfoModal";

const ChatHeader = ({ onSearchClick, onPinnedClick, onBurgerClick, onAvatarClick }) => {
  const { selectedUser, setSelectedUser, userStatus, chatSettings, lockedChats, setChatExpiry, lockChat, unlockChat } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showChatInfoModal, setShowChatInfoModal] = useState(false);
  const menuRef = useRef(null);

  const status = userStatus[selectedUser?._id];
  const isOnline = onlineUsers.includes(selectedUser?._id);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  if (!selectedUser) return <div className="h-16 flex-shrink-0" />;

  return (
    <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-border dark:border-border-dark bg-surface/95 dark:bg-surface-dark/95 backdrop-blur-md flex-shrink-0 z-20 select-none transition-colors duration-200">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          {onBurgerClick && (
            <button
              onClick={onBurgerClick}
              className="size-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 lg:hidden -ml-1 transition-colors focus:ring-2 focus:ring-primary outline-none"
              aria-label="Open Workspace Menu"
            >
              <Menu size={20} />
            </button>
          )}
          {/* Back button — mobile only */}
          <button
            onClick={() => setSelectedUser(null)}
            className={`size-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 lg:hidden transition-colors focus:ring-2 focus:ring-primary outline-none ${onBurgerClick ? "" : "-ml-1"}`}
            aria-label="Back"
          >
            <ChevronLeft size={24} />
          </button>
          
          {/* Avatar with Ring */}
          <div className="relative flex-shrink-0" onClick={onAvatarClick}>
            <div className="size-10 sm:size-11 rounded-full relative shadow-sm border border-border dark:border-border-dark overflow-hidden cursor-pointer">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} className="object-cover w-full h-full" />
              {isOnline && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-slate-800" />
              )}
            </div>
          </div>

          {/* User info */}
          <div className="flex-1 min-w-0 text-left cursor-pointer" onClick={onAvatarClick}>
            <h3 className="font-bold text-[15px] sm:text-[16px] text-slate-900 dark:text-slate-100 leading-tight hover:text-primary transition-colors truncate">
              {selectedUser.fullName}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              {isOnline ? (
                <span className="text-[11px] text-emerald-500 font-bold">Active Now</span>
              ) : (
                <span className="text-[11px] text-slate-400 font-semibold">Offline</span>
              )}
              {status?.statusMessage && (
                <>
                  <span className="text-[10px] text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-[11px] text-slate-400 truncate italic font-medium">&quot;{status.statusMessage}&quot;</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {/* Call & Video Call Icons - Hidden on very small screens if needed, but keeping for now */}
          <button className="size-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" title="Voice Call">
            <Phone size={18} />
          </button>
          <button className="size-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors hidden sm:flex" title="Video Call">
            <Video size={18} />
          </button>

          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          <button
            onClick={onSearchClick}
            className="size-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors hidden sm:flex"
            title="Search messages"
          >
            <Search size={18} />
          </button>

          <div className="relative" ref={menuRef}>
            <button
              className="size-9 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical size={18} />
            </button>
            {showMenu && (
              <div
                className="absolute right-0 mt-2 z-[50] p-1.5 shadow-xl bg-white dark:bg-slate-800 rounded-2xl w-52 border border-slate-200 dark:border-slate-700 font-medium flex flex-col gap-0.5 animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-200 font-medium transition-all duration-150 active:scale-[0.98]"
                  onClick={() => {
                    onPinnedClick && onPinnedClick();
                    setShowMenu(false);
                  }}
                >
                  Pinned Messages
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-200 font-medium transition-all duration-150 active:scale-[0.98]"
                  onClick={() => {
                    setShowPrivacyModal(true);
                    setShowMenu(false);
                  }}
                >
                  Privacy Settings
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-200 font-medium transition-all duration-150 active:scale-[0.98]"
                  onClick={() => {
                    onSearchClick && onSearchClick();
                    setShowMenu(false);
                  }}
                >
                  Search
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-200 font-medium transition-all duration-150 active:scale-[0.98] flex items-center gap-2"
                  onClick={() => {
                    setShowExportModal(true);
                    setShowMenu(false);
                  }}
                >
                  <Download size={15} />
                  Export Chat
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-200 font-medium transition-all duration-150 active:scale-[0.98]"
                  onClick={() => {
                    setShowProfileModal(true);
                    setShowMenu(false);
                  }}
                >
                  View Profile
                </button>
                <button
                  type="button"
                  className="w-full text-left px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-200 font-medium transition-all duration-150 active:scale-[0.98]"
                  onClick={() => {
                    setShowChatInfoModal(true);
                    setShowMenu(false);
                  }}
                >
                  Chat Info
                </button>
              </div>
            )}
          </div>

          {/* Close button — desktop only */}
          <button onClick={() => setSelectedUser(null)} className="size-8 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors hidden lg:inline-flex" title="Close Chat">
            <X size={17} />
          </button>
        </div>
      </div>

      {showExportModal && (
        <ExportChatModal
          user={selectedUser}
          onClose={() => setShowExportModal(false)}
        />
      )}
      <ChatPrivacyMenu
        open={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        selectedUser={selectedUser}
        chatSettings={chatSettings}
        isLocked={selectedUser ? lockedChats.some((chat) => chat._id === selectedUser._id) : false}
        onSetChatExpiry={setChatExpiry}
        onLockChat={lockChat}
        onUnlockChat={unlockChat}
      />
      <UserProfileModal open={showProfileModal} onClose={() => setShowProfileModal(false)} user={selectedUser} />
      <ChatInfoModal open={showChatInfoModal} onClose={() => setShowChatInfoModal(false)} user={selectedUser} chatSettings={chatSettings?.[selectedUser?._id]} />
    </div>
  );
};

export default ChatHeader;
