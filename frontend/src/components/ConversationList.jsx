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
  Edit3, 
  Plus
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
  const [activeFilter, setActiveFilter] = useState("all"); // all, unread, groups, locked
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

  const displayUsers = searchInput ? searchResults : users;

  let baseList = [...displayUsers];

  // Filter logic based on tab selected
  if (activeFilter === "unread") {
    baseList = baseList.filter((u) => u.unreadCount > 0 || (users.find(x => x._id === u._id)?.unreadCount > 0));
  } else if (activeFilter === "groups") {
    baseList = baseList.filter((u) => u.isGroup);
  } else if (activeFilter === "locked") {
    baseList = []; // Handled separately by LockedChatsPanel
  }

  // Separate Pinned vs Unpinned Chats
  const pinnedUsers = baseList.filter((user) => authUser?.pinnedChats?.includes(user._id));
  const unpinnedUsers = baseList.filter((user) => !authUser?.pinnedChats?.includes(user._id));

  // Stories (online contacts) excluding authUser
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
            transition-all duration-200 relative
            ${isSelected 
              ? "bg-blue-500/5 dark:bg-blue-400/5 shadow-sm border border-blue-500/10 dark:border-blue-400/10" 
              : "hover:bg-slate-100 dark:hover:bg-slate-700/50 border border-transparent"}
            ${isArchived ? "opacity-60" : ""}
          `}
        >
          {/* Avatar Area */}
          <div className="relative flex-shrink-0 select-none">
            <img
              src={user.profilePic || "/avatar.png"}
              alt={user.fullName || user.name}
              className="size-12 object-cover rounded-full shadow-sm border border-slate-100 dark:border-slate-700"
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
                <span className="font-bold text-[15px] text-slate-850 dark:text-slate-100 truncate">
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
                <span className={`text-slate-550 dark:text-slate-400 ${unreadCount > 0 ? "font-semibold text-slate-800 dark:text-slate-100" : ""}`}>
                  {lastMessage.text || lastMessage.image ? lastMessage.text || "📸 Image" : lastMessage.file ? "📎 File" : "No content"}
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
            className="absolute right-4 top-12 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-50 min-w-[150px] overflow-hidden py-1 animate-fadeIn"
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
        <h1 className="text-2xl font-bold text-slate-850 dark:text-slate-100 tracking-tight">Chats</h1>
        <button className="size-8 flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" title="New Message">
          <Edit3 className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Persistent Redesigned Search Input Row */}
      <div className="flex gap-2.5 items-center mb-4 px-5 flex-shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchInput}
            onChange={handleSearch}
            className="w-full pl-9 pr-9 py-2 bg-slate-100 dark:bg-slate-900/60 border border-transparent rounded-2xl text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {searchInput && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-250"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <button className="size-9 bg-slate-100 dark:bg-slate-900/60 flex items-center justify-center rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-850 active:scale-95 transition-all">
          <Plus size={18} />
        </button>
      </div>

      {/* Stories Online Active list (Mockup Screen 1 Circle items) */}
      {!searchInput && activeFilter !== "locked" && (
        <div className="px-5 mb-4 flex-shrink-0">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none select-none">
            {/* Self Status Card */}
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer">
              <div className="relative p-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                <div className="size-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs select-none">
                  You
                </div>
                <span className="absolute bottom-0 right-0 size-3.5 bg-blue-500 border-2 border-white dark:border-slate-800 rounded-full flex items-center justify-center text-white text-[10px] font-bold">+</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 truncate w-12 text-center">My Status</span>
            </div>

            {/* Online Contacts Cards */}
            {onlineList.map((user) => (
              <button
                key={user._id}
                onClick={() => handleUserSelect(user)}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 group"
              >
                <div className="relative p-0.5 rounded-full border border-blue-500/20 dark:border-blue-400/20 group-hover:border-blue-500 transition-colors">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="size-11 rounded-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-slate-800" />
                </div>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 truncate w-12 text-center group-hover:text-blue-500 transition-colors">
                  {user.fullName.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pill Quick Filters Row */}
      <div className="flex gap-2 px-5 overflow-x-auto pb-3.5 mb-1.5 flex-shrink-0 scrollbar-none">
        {["all", "unread", "groups", "locked"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all uppercase tracking-wider ${
              activeFilter === filter
                ? "bg-blue-500 text-white shadow-sm shadow-blue-500/20"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-900/60 dark:hover:bg-slate-850 text-slate-500 dark:text-slate-400"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Conversation List Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-2 pb-6">
        {activeFilter === "locked" && (
          <LockedChatsPanel onSelectUser={handleUserSelect} />
        )}

        {activeFilter !== "locked" && (
          <>
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

            {baseList.length === 0 && (
              <div className="text-center text-slate-400 dark:text-slate-500 py-8 text-sm">
                {searchInput ? "No users found" : "No chats yet"}
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
};

export default ConversationList;
