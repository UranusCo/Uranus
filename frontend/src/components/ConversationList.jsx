import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import LockedChatsPanel from "./LockedChatsPanel";
import { Avatar, Badge } from "./ui/BlinkComponents";
import { 
  Search, 
  X, 
  Archive, 
  Volume2, 
  Pin, 
  Edit3, 
  Plus,
  Menu
} from "lucide-react";

const ConversationList = ({ onBurgerClick }) => {
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
  const [activeFilter, setActiveFilter] = useState("all"); 
  const [searchInput, setSearchInput] = useState("");
  const [contextMenuOpen, setContextMenuOpen] = useState(null);
  
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    searchUsers(query);
  };

  const displayUsers = searchInput ? searchResults : users;
  let baseList = [...displayUsers];

  if (activeFilter === "unread") {
    baseList = baseList.filter((u) => u.unreadCount > 0);
  }

  const pinnedUsers = baseList.filter((user) => authUser?.pinnedChats?.includes(user._id));
  const unpinnedUsers = baseList.filter((user) => !authUser?.pinnedChats?.includes(user._id));

  if (isUsersLoading) return <SidebarSkeleton />;

  const renderUserItem = (user) => {
    const isOnline = onlineUsers.includes(user._id);
    const lastMessage = user.lastMessage;
    const isSelected = selectedUser?._id === user._id;

    return (
      <button
        key={user._id}
        onClick={() => setSelectedUser(user)}
        className={`w-full flex items-center gap-3.5 p-3.5 mx-2 rounded-2xl transition-all duration-200 ${
          isSelected 
            ? "bg-primary/10 shadow-soft" 
            : "hover:bg-slate-50 dark:hover:bg-slate-800"
        }`}
      >
        <div className="relative">
          <Avatar src={user.profilePic} size="md" />
          {isOnline && <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-surface dark:ring-surface-dark" />}
        </div>
        <div className="flex-1 min-w-0 text-left">
          <div className="flex justify-between items-center mb-0.5">
            <p className="font-semibold text-slate-900 dark:text-slate-100 truncate text-sm">{user.fullName}</p>
            <span className="text-[10px] text-slate-400 font-medium">12:30 PM</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-500 truncate">{lastMessage?.text || "..."}</p>
            <Badge count={user.unreadCount} />
          </div>
        </div>
      </button>
    );
  };

  return (
    <aside className="h-full w-full lg:w-[320px] bg-surface dark:bg-surface-dark flex flex-col transition-colors duration-200 border-r border-border dark:border-border-dark">
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Chats</h1>
        <button className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><Edit3 size={18} /></button>
      </div>

      <div className="px-5 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchInput}
            onChange={handleSearch}
            className="w-full pl-9 pr-4 py-2 bg-background dark:bg-background-dark border border-border dark:border-border-dark rounded-2xl text-sm focus:outline-none focus:border-primary transition"
          />
        </div>
      </div>

      <div className="flex gap-2 px-5 mb-4">
        {["all", "unread", "groups"].map((f) => (
          <button 
            key={f} 
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase ${activeFilter === f ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-1 pb-6">
        {pinnedUsers.map(renderUserItem)}
        {unpinnedUsers.map(renderUserItem)}
      </div>
    </aside>
  );
};

export default ConversationList;
