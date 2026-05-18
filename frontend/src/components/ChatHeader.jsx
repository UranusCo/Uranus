import { X, Pin, Search, MoreVertical, Download, ChevronLeft, Phone, Video } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import ExportChatModal from "./ExportChatModal";
import ChatPrivacyMenu from "./ChatPrivacyMenu";
import UserProfileModal from "./UserProfileModal";
import ChatInfoModal from "./ChatInfoModal";

const ChatHeader = ({ onSearchClick, onPinnedClick }) => {
  const { selectedUser, setSelectedUser, userStatus, chatSettings, lockedChats, setChatExpiry, lockChat, unlockChat } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showChatInfoModal, setShowChatInfoModal] = useState(false);
  const menuRef = useRef(null);

  const status = userStatus[selectedUser._id];
  const isOnline = onlineUsers.includes(selectedUser._id);

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

  return (
    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md flex-shrink-0 z-20 select-none transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          {/* Back button — mobile only */}
          <button
            onClick={() => setSelectedUser(null)}
            className="size-8 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 lg:hidden -ml-2"
            aria-label="Back"
          >
            <ChevronLeft size={22} />
          </button>
          
          {/* Avatar with Ring */}
          <div className="relative">
            <div className="size-11 rounded-full relative shadow-sm border border-slate-200 dark:border-slate-750 overflow-hidden flex-shrink-0">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} className="object-cover w-full h-full" />
              {isOnline && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-slate-800" />
              )}
            </div>
          </div>

          {/* User info */}
          <div className="flex-1 min-w-0 text-left">
            <h3 className="font-bold text-[16px] text-slate-800 dark:text-slate-100 leading-tight hover:text-blue-500 dark:hover:text-blue-400 cursor-pointer transition-colors" onClick={() => setShowProfileModal(true)}>
              {selectedUser.fullName}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate flex items-center gap-1.5 font-semibold">
              {isOnline ? (
                <span className="text-emerald-500 dark:text-emerald-400 font-bold">Active Now</span>
              ) : (
                <span className="text-slate-400 dark:text-slate-500">Offline</span>
              )}
              {status?.statusMessage && (
                <>
                  <span>•</span>
                  <span className="truncate italic">"{status.statusMessage}"</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Call & Video Call Icons */}
          <button className="size-8 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex" title="Voice Call">
            <Phone size={17} />
          </button>
          <button className="size-8 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex" title="Video Call">
            <Video size={17} />
          </button>

          <ThemeToggle />

          <button
            onClick={onSearchClick}
            className="size-8 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Search messages"
          >
            <Search size={17} />
          </button>

          <button
            onClick={onPinnedClick}
            className="size-8 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            title="Pinned messages"
          >
            <Pin size={17} />
          </button>

          <div className="relative" ref={menuRef}>
            <button
              className="size-8 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical size={17} />
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
