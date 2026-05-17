import { X, Pin, Search, MoreVertical, Download, ChevronLeft } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import ExportChatModal from "./ExportChatModal";
import ChatPrivacyMenu from "./ChatPrivacyMenu";

const ChatHeader = ({ onSearchClick, onPinnedClick }) => {
  const { selectedUser, setSelectedUser, userStatus, chatSettings, lockedChats, setChatExpiry, lockChat, unlockChat } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const status = userStatus[selectedUser._id];
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          {/* Back button — mobile only */}
          <button
            onClick={() => setSelectedUser(null)}
            className="btn btn-sm btn-ghost lg:hidden -ml-1 mr-0"
            aria-label="Back"
          >
            <ChevronLeft size={22} />
          </button>
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
              {isOnline && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100 animate-pulse" />
              )}
            </div>
          </div>

          {/* User info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70 truncate">
              {isOnline ? (
                <span className="text-green-500">🟢 Online</span>
              ) : (
                <span>🔴 Offline</span>
              )}
              {status?.statusMessage && ` • ${status.statusMessage}`}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            onClick={onSearchClick}
            className="btn btn-sm btn-ghost"
            title="Search messages"
          >
            <Search size={18} />
          </button>

          <button
            onClick={onPinnedClick}
            className="btn btn-sm btn-ghost"
            title="Pinned messages"
          >
            <Pin size={18} />
          </button>

          <div className="dropdown dropdown-end">
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setShowMenu(!showMenu)}
            >
              <MoreVertical size={18} />
            </button>
            {showMenu && (
              <ul
                className="dropdown-content z-[50] menu p-2 shadow bg-base-100 rounded-box w-52"
                onClick={(e) => e.stopPropagation()}
              >
                <li>
                  <button
                    type="button"
                    className="w-full text-left"
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
                    className="w-full text-left"
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
                    className="w-full text-left"
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
                    className="w-full text-left flex items-center gap-2"
                    onClick={() => {
                      setShowExportModal(true);
                      setShowMenu(false);
                    }}
                  >
                    <Download size={16} className="mr-2" />
                    Export Chat
                  </button>
                </li>
                <li>
                  <button type="button" className="w-full text-left">View Profile</button>
                </li>
                <li>
                  <button type="button" className="w-full text-left">Info</button>
                </li>
              </ul>
            )}
          </div>

          {/* Close button — desktop only */}
          <button onClick={() => setSelectedUser(null)} className="btn btn-sm btn-ghost hidden lg:inline-flex">
            <X size={18} />
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
    </div>
  );
};

export default ChatHeader;
