import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import LockedChatsPanel from "./LockedChatsPanel";
import { 
  Search, 
  X, 
  Archive, 
  Volume2, 
  Pin, 
  Edit3 
} from "lucide-react";

const ConversationList = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    searchUsers,
    searchResults,
    clearSearch,
    toggleArchiveChat,
    togglePinChat,
    toggleMuteChat,
    typingUsers,
  } = useChatStore();

  const { onlineUsers, authUser } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
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

  const displayUsers = searchInput ? searchResults : users;

  const filteredUsers = showOnlineOnly
    ? displayUsers.filter((user) => onlineUsers.includes(user._id))
    : displayUsers;

  // Separate Pinned vs Unpinned Chats
  const pinnedUsers = filteredUsers.filter((user) => authUser?.pinnedChats?.includes(user._id));
  const unpinnedUsers = filteredUsers.filter((user) => !authUser?.pinnedChats?.includes(user._id));

  // Get online users horizontal list (excluding the authUser)
  const onlineList = users.filter((u) => onlineUsers.includes(u._id) && u._id !== authUser?._id);

  const getMessageTime = (message) => {
    if (!message || !message.createdAt) return "";
    const date = new Date(message.createdAt);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (isUsersLoading) return <SidebarSkeleton />;

  const renderUserItem = (user) => {
    const isOnline = onlineUsers.includes(user._id);
    const lastMessage = user.lastMessage;
    const unreadCount = users.find(u => u._id === user._id)?.unreadCount || 0;
    const isArchived = authUser?.archivedChats?.includes(user._id);
    const isPinned = authUser?.pinnedChats?.includes(user._id);
    const isMuted = authUser?.mutedChats?.includes(user._id);
    const isTyping = typingUsers.includes(user._id);
    const isSelected = selectedUser?._id === user._id;

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
      <div key={user._id} className="relative group/item px-3 py-0.5">
        {/* Selected Accent Bar */}
        {isSelected && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-blue-500 dark:bg-blue-400 rounded-r-full z-10" />
        )}

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
            w-full p-3.5 flex items-center gap-3.5 rounded-2xl text-left
            transition-all duration-205 relative
            ${isSelected 
              ? "bg-blue-500/5 dark:bg-blue-400/5 shadow-sm border border-blue-500/10 dark:border-blue-400/10" 
              : "hover:bg-slate-100 dark:hover:bg-slate-700/50 border border-transparent"}
            ${isArchived ? "opacity-60" : ""}
          `}
        >
          {/* Avatar Area */}
          <div className="relative flex-shrink-0">
            <img
              src={user.profilePic || "/avatar.png"}
              alt={user.fullName || user.name}
              className="size-12 object-cover rounded-full shadow-sm"
            />
            {isOnline && (
              <span
                className="absolute bottom-0 right-0 size-3 bg-green-500 
                rounded-full ring-2 ring-white dark:ring-slate-800"
              />
            )}
          </div>

          {/* User & Last Message Info */}
          <div className="block min-w-0 flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-semibold text-[15px] text-slate-800 dark:text-slate-100 truncate">
                  {user.fullName || user.name}
                </span>
                {/* Chat status badges */}
                <div className="flex gap-1 flex-shrink-0">
                  {isPinned && <Pin size={12} className="text-amber-500 fill-amber-500" />}
                  {isMuted && <Volume2 size={12} className="text-blue-500 dark:text-blue-400" />}
                  {isArchived && <Archive size={12} className="text-slate-400" />}
                </div>
              </div>
              
              {/* Message Time */}
              {lastMessage && (
                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 whitespace-nowrap ml-2">
                  {getMessageTime(lastMessage)}
                </span>
              )}
            </div>

            {/* Last Message / Typing status */}
            <div className="text-xs truncate">
              {isTyping ? (
                <span className="text-emerald-500 dark:text-emerald-400 font-medium animate-pulse">
                  Typing...
                </span>
              ) : lastMessage ? (
                <span className={`text-slate-500 dark:text-slate-400 ${unreadCount > 0 ? "font-semibold text-slate-800 dark:text-slate-100" : ""}`}>
                  {lastMessage.text || lastMessage.image ? "📸 Image" : lastMessage.file ? "📎 File" : "No content"}
                </span>
              ) : (
                <span className="text-slate-400 dark:text-slate-500 italic">
                  {isOnline ? "Online" : "Offline"}
                </span>
              )}
            </div>
          </div>

          {/* Unread Badge */}
          {unreadCount > 0 && !isMuted && (
            <div className="flex flex-shrink-0">
              <span className="size-5 flex items-center justify-center rounded-full bg-rose-500 text-white text-[10px] font-bold shadow-sm shadow-rose-500/20">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            </div>
          )}
        </button>

        {/* Context menu (right-click on desktop, long-press on mobile) */}
        {contextMenuOpen === user._id && (
          <div
            className="absolute right-4 top-12 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-50 min-w-[150px] overflow-hidden py-1"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <button
              onClick={handlePin}
              className="w-full px-4 py-2.5 text-left hover:bg-slate-100 dark:hover:bg-slate-700 text-sm flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200 transition-colors"
            >
              <Pin size={14} className={isPinned ? "fill-amber-500 text-amber-500" : ""} />
              {isPinned ? "Unpin Chat" : "Pin Chat"}
            </button>
            <button
              onClick={handleMute}
              className="w-full px-4 py-2.5 text-left hover:bg-slate-100 dark:hover:bg-slate-700 text-sm flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200 transition-colors"
            >
              <Volume2 size={14} />
              {isMuted ? "Unmute Chat" : "Mute Chat"}
            </button>
            <button
              onClick={handleArchive}
              className="w-full px-4 py-2.5 text-left hover:bg-slate-100 dark:hover:bg-slate-700 text-sm flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200 border-t border-slate-100 dark:border-slate-700 transition-colors"
            >
              <Archive size={14} />
              {isArchived ? "Unarchive Chat" : "Archive Chat"}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="h-full w-full lg:w-[300px] bg-white dark:bg-slate-800 flex flex-col transition-all duration-200 border-r border-slate-200 dark:border-slate-700 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Messages</h1>
        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setShowSearchBar(!showSearchBar)}
            className={`size-8 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${showSearchBar ? "bg-slate-150 dark:bg-slate-700" : ""}`}
            title="Search"
          >
            <Search className="w-4.5 h-4.5" />
          </button>
          <button className="size-8 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" title="New Message">
            <Edit3 className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* Inline Search Bar (Toggled) */}
      {(showSearchBar || searchInput) && (
        <div className="px-5 mb-4 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchInput}
              onChange={handleSearch}
              className="w-full pl-9 pr-9 py-2 rounded-xl bg-slate-100 dark:bg-slate-700/40 border border-transparent focus:border-blue-500/20 focus:bg-white dark:focus:bg-slate-800 text-slate-800 dark:text-slate-100 text-sm outline-none transition-all focus:ring-1 focus:ring-blue-500"
            />
            {searchInput && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Online Users List (Horizontal) */}
      {!searchInput && onlineList.length > 0 && (
        <div className="px-5 mb-5 flex-shrink-0">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Online Now</span>
            <span className="text-[11px] font-bold text-blue-500 dark:text-blue-400 cursor-pointer hover:text-blue-600 transition-colors">See All</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-1.5 scrollbar-thin select-none">
            {onlineList.map((user) => (
              <button
                key={user._id}
                onClick={() => handleUserSelect(user)}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
              >
                <div className="relative">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="size-[46px] rounded-full object-cover border-2 border-transparent group-hover:border-blue-500/30 dark:group-hover:border-blue-400/30 transition-all duration-200"
                  />
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-slate-850" />
                </div>
                <span className="text-[11px] font-semibold text-slate-650 dark:text-slate-350 truncate w-12 text-center group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  {user.fullName.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Filters */}
      <div className="px-5 mb-4 flex items-center justify-between flex-shrink-0">
        <label className="cursor-pointer flex items-center gap-2 select-none group">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="w-3.5 h-3.5 text-blue-500 border-slate-300 dark:border-slate-600 rounded bg-transparent focus:ring-blue-500 focus:ring-1 cursor-pointer"
          />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors">Show online only</span>
        </label>
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 rounded-full">
          {onlineUsers.length - 1} Active
        </span>
      </div>

      {/* Conversation List Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-2 pb-6">
        <LockedChatsPanel onSelectUser={handleUserSelect} />

        {/* Pinned Chats Section */}
        {pinnedUsers.length > 0 && (
          <div className="space-y-0.5">
            <div className="px-5 py-2 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              <Pin size={11} className="fill-current" />
              Pinned Messages
            </div>
            {pinnedUsers.map(renderUserItem)}
          </div>
        )}

        {/* All Chats Section */}
        <div className="space-y-0.5">
          {pinnedUsers.length > 0 && unpinnedUsers.length > 0 && (
            <div className="px-5 py-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-t border-slate-200/50 dark:border-slate-700/50 mt-2">
              All Messages
            </div>
          )}
          {unpinnedUsers.map(renderUserItem)}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center text-slate-400 dark:text-slate-500 py-8 text-sm">
            {searchInput ? "No users found" : "No chats yet"}
          </div>
        )}
      </div>
    </aside>
  );
};

export default ConversationList;
