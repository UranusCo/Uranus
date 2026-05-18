import { X, Pin, Search, MoreVertical, Download, ChevronLeft, Phone, Video } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useState } from "react";
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

  const status = userStatus[selectedUser._id];
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="px-6 py-4 border-b border-base-200/80 bg-base-100/90 backdrop-blur-md flex-shrink-0 z-10 select-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          {/* Back button — mobile only */}
          <button
            onClick={() => setSelectedUser(null)}
            className="btn btn-sm btn-ghost lg:hidden -ml-2 p-1 text-base-content/70"
            aria-label="Back"
          >
            <ChevronLeft size={22} />
          </button>
          
          {/* Avatar with Ring */}
          <div className="avatar">
            <div className="size-11 rounded-full relative shadow-sm border border-base-200/60 overflow-hidden">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} className="object-cover w-full h-full" />
              {isOnline && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100" />
              )}
            </div>
          </div>

          {/* User info */}
          <div className="flex-1 min-w-0 text-left">
            <h3 className="font-bold text-[16px] text-base-content leading-tight hover:text-primary cursor-pointer transition-colors" onClick={() => setShowProfileModal(true)}>
              {selectedUser.fullName}
            </h3>
            <p className="text-xs text-base-content/50 mt-0.5 truncate flex items-center gap-1.5 font-medium">
              {isOnline ? (
                <span className="text-emerald-500 dark:text-emerald-400 font-semibold">Active Now</span>
              ) : (
                <span className="text-base-content/40">Offline</span>
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
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Call & Video Call Icons (matches reference image placeholders) */}
          <button className="btn btn-sm btn-ghost btn-circle text-base-content/55 hover:bg-base-200 hidden sm:inline-flex" title="Voice Call">
            <Phone size={17} />
          </button>
          <button className="btn btn-sm btn-ghost btn-circle text-base-content/55 hover:bg-base-200 hidden sm:inline-flex" title="Video Call">
            <Video size={17} />
          </button>

          <ThemeToggle />

          <button
            onClick={onSearchClick}
            className="btn btn-sm btn-ghost btn-circle text-base-content/55 hover:bg-base-200"
            title="Search messages"
          >
            <Search size={17} />
          </button>

          <button
            onClick={onPinnedClick}
            className="btn btn-sm btn-ghost btn-circle text-base-content/55 hover:bg-base-200"
            title="Pinned messages"
          >
            <Pin size={17} />
          </button>

          <div className="dropdown dropdown-end">
            <button
              className="btn btn-sm btn-ghost btn-circle text-base-content/55 hover:bg-base-200"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical size={17} />
            </button>
            {showMenu && (
              <ul
                className="dropdown-content z-[50] menu p-2 shadow-xl bg-base-100 rounded-2xl w-52 border border-base-200 mt-2 font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                <li>
                  <button
                    type="button"
                    className="w-full text-left rounded-xl"
                    onClick={() => {
                      onPinnedClick && onPinnedClick();
                      setShowMenu(false);
                    }}
                  >
                    Pinned Messages
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="w-full text-left rounded-xl"
                    onClick={() => {
                      setShowPrivacyModal(true);
                      setShowMenu(false);
                    }}
                  >
                    Privacy Settings
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="w-full text-left rounded-xl"
                    onClick={() => {
                      onSearchClick && onSearchClick();
                      setShowMenu(false);
                    }}
                  >
                    Search
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="w-full text-left rounded-xl flex items-center gap-2"
                    onClick={() => {
                      setShowExportModal(true);
                      setShowMenu(false);
                    }}
                  >
                    <Download size={15} />
                    Export Chat
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="w-full text-left rounded-xl"
                    onClick={() => {
                      setShowProfileModal(true);
                      setShowMenu(false);
                    }}
                  >
                    View Profile
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="w-full text-left rounded-xl"
                    onClick={() => {
                      setShowChatInfoModal(true);
                      setShowMenu(false);
                    }}
                  >
                    Chat Info
                  </button>
                </li>
              </ul>
            )}
          </div>

          {/* Close button — desktop only */}
          <button onClick={() => setSelectedUser(null)} className="btn btn-sm btn-ghost btn-circle text-base-content/55 hover:bg-base-200 hidden lg:inline-flex" title="Close Chat">
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
