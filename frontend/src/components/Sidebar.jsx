import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search, X, Archive, Volume2, Pin } from "lucide-react";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    searchUsers,
    searchResults,
    searchQuery,
    clearSearch,
    toggleArchiveChat,
    togglePinChat,
    toggleMuteChat,
  } = useChatStore();

  const { onlineUsers, authUser } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [contextMenuOpen, setContextMenuOpen] = useState(null);
  const longPressRef = useRef(null);
  const didLongPressRef = useRef(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Close context menu when tapping/clicking outside
  useEffect(() => {
    if (!contextMenuOpen) return;
    const close = () => setContextMenuOpen(null);
    document.addEventListener("click", close);
    document.addEventListener("touchstart", close);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("touchstart", close);
    };
  }, [contextMenuOpen]);

  const handleUserLongPressStart = (userId) => {
    didLongPressRef.current = false;
    longPressRef.current = setTimeout(() => {
      didLongPressRef.current = true;
      setContextMenuOpen(userId);
      if (navigator.vibrate) navigator.vibrate(50);
    }, 500);
  };

  const handleUserLongPressEnd = () => {
    if (longPressRef.current) {
      clearTimeout(longPressRef.current);
      longPressRef.current = null;
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    searchUsers(query);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    clearSearch();
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    handleClearSearch();
  };

  // Show search results if searching, otherwise show users list
  const displayUsers = searchInput ? searchResults : users;

  const filteredUsers = showOnlineOnly
    ? displayUsers.filter((user) => onlineUsers.includes(user._id))
    : displayUsers;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-full lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2 mb-4">
          <Users className="size-6" />
          <span className="font-medium">Messages</span>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 size-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchInput}
              onChange={handleSearch}
              className="w-full pl-8 pr-8 py-1.5 input input-bordered input-sm text-[16px] lg:text-sm"
            />
            {searchInput && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-2.5 text-zinc-400 hover:text-zinc-200"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Online filter toggle */}
        <div className="mt-3 flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => {
          const isOnline = onlineUsers.includes(user._id);
          const lastMessage = user.lastMessage;
          const unreadCount = users
            .find(u => u._id === user._id)
            ?.unreadCount || 0;
          const isArchived = authUser?.archivedChats?.includes(user._id);
          const isPinned = authUser?.pinnedChats?.includes(user._id);
          const isMuted = authUser?.mutedChats?.includes(user._id);

          const handleArchive = async (e) => {
            e.stopPropagation();
            await toggleArchiveChat(user._id);
          };

          const handlePin = async (e) => {
            e.stopPropagation();
            await togglePinChat(user._id);
          };

          const handleMute = async (e) => {
            e.stopPropagation();
            await toggleMuteChat(user._id);
          };

          return (
            <div key={user._id} className="relative">
              <button
                onClick={() => {
                  if (didLongPressRef.current) {
                    didLongPressRef.current = false;
                    return;
                  }
                  handleUserSelect(user);
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setContextMenuOpen(contextMenuOpen === user._id ? null : user._id);
                }}
                onTouchStart={() => handleUserLongPressStart(user._id)}
                onTouchEnd={handleUserLongPressEnd}
                onTouchMove={handleUserLongPressEnd}
                className={`
                  w-full p-3 flex items-center gap-3
                  hover:bg-base-300 transition-colors
                  ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                  ${isArchived ? "opacity-60" : ""}
                `}
              >
                <div className="relative">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName || user.name}
                    className="size-12 object-cover rounded-full"
                  />
                  {isOnline && (
                    <span
                      className="absolute bottom-0 right-0 size-3 bg-green-500 
                      rounded-full ring-2 ring-zinc-900"
                    />
                  )}
                </div>

                {/* User info */}
                <div className="block text-left min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium truncate">
                      {user.fullName || user.name}
                    </div>
                    {/* Chat status indicators */}
                    <div className="flex gap-1">
                      {isPinned && <Pin size={14} className="text-warning" />}
                      {isMuted && <Volume2 size={14} className="text-info" />}
                      {isArchived && <Archive size={14} className="text-zinc-500" />}
                    </div>
                  </div>
                  <div className="text-sm text-zinc-400 truncate">
                    {lastMessage
                      ? lastMessage.text || lastMessage.image ? "📸 Image" : lastMessage.file ? "📎 File" : "No content"
                      : isOnline
                        ? "Online"
                        : "Offline"}
                  </div>
                </div>

                {/* Unread indicator */}
                {unreadCount > 0 && !isMuted && (
                  <div className="flex">
                    <span className="badge badge-sm badge-primary">
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </span>
                  </div>
                )}
              </button>

              {/* Context menu (right-click on desktop, long-press on mobile) */}
              {contextMenuOpen === user._id && (
                <div
                  className="absolute right-0 top-full mt-1 bg-base-100 rounded-lg shadow-lg border border-base-300 z-50 min-w-[150px]"
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={handlePin}
                    className="w-full px-4 py-2 text-left hover:bg-base-200 text-sm flex items-center gap-2"
                  >
                    <Pin size={14} />
                    {isPinned ? "Unpin" : "Pin"}
                  </button>
                  <button
                    onClick={handleMute}
                    className="w-full px-4 py-2 text-left hover:bg-base-200 text-sm flex items-center gap-2"
                  >
                    <Volume2 size={14} />
                    {isMuted ? "Unmute" : "Mute"}
                  </button>
                  <button
                    onClick={handleArchive}
                    className="w-full px-4 py-2 text-left hover:bg-base-200 text-sm flex items-center gap-2 border-t border-base-300"
                  >
                    <Archive size={14} />
                    {isArchived ? "Unarchive" : "Archive"}
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4 text-sm">
            {searchInput ? "No users found" : "No chats yet"}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
