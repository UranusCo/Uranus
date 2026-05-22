import { useEffect, useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useFriendStore } from "../store/useFriendStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import FrequentContacts from "./FrequentContacts";
import { Avatar } from "./ui/BlinkComponents";
import { Button } from "./ui";
import Input from "./ui/Input";
import Badge from "./ui/Badge";
import { Search, Edit3 } from "lucide-react";
import { formatMessageTime } from "../lib/utils";

const ConversationList = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    searchUsers,
    searchResults,
  } = useChatStore();

  const { friends, requests, sentRequests, fetchFriends, fetchRequests } = useFriendStore();
  const { onlineUsers, authUser } = useAuthStore();
  const [searchInput, setSearchInput] = useState("");
  const searchRef = useRef(null);
  
  useEffect(() => {
    getUsers();
    fetchFriends();
    fetchRequests();
  }, [getUsers, fetchFriends, fetchRequests]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    searchUsers(query);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      const key = (e.key || '').toLowerCase();
      if ((e.ctrlKey || e.metaKey) && key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    const onOpen = () => searchRef.current?.focus();
    window.addEventListener('openChatSearch', onOpen);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('openChatSearch', onOpen);
    };
  }, []);

  // Helper to determine if a user is related (friend or has request)
  const isRelated = (userId) => {
    if (!userId) return false;
    const uid = String(userId);
    
    // Check if they are already friends
    const isFriend = friends.some(f => String(f._id) === uid);
    if (isFriend) return true;

    // Check if there's an incoming pending request from them
    const hasIncoming = requests.some(r => r.requesterId && String(r.requesterId._id) === uid);
    if (hasIncoming) return true;

    // Check if there's an outgoing pending request to them
    const hasOutgoing = sentRequests.some(r => r.receiverId && String(r.receiverId._id) === uid);
    if (hasOutgoing) return true;

    return false;
  };

  const displayUsers = searchInput ? searchResults : users;
  
  // Show all past chats plus related users in the sidebar.
  const baseList = displayUsers
    .filter((user) => searchInput || user.lastMessage || isRelated(user._id))
    .sort((a, b) => {
      const aTime = a.lastMessage ? new Date(a.lastMessage.createdAt).getTime() : 0;
      const bTime = b.lastMessage ? new Date(b.lastMessage.createdAt).getTime() : 0;
      return bTime - aTime;
    });

  // Frequent users are only actual friends
  const frequentUsers = friends.slice(0, 5);
  
  const pinnedUsers = baseList.filter((user) => authUser?.pinnedChats?.includes(user._id));
  const unpinnedUsers = baseList.filter((user) => !authUser?.pinnedChats?.includes(user._id));

  if (isUsersLoading) return <SidebarSkeleton />;

  const renderUserItem = (user) => {
    const isOnline = onlineUsers.includes(user._id);
    const lastMessage = user.lastMessage;
    const isSelected = selectedUser?._id === user._id;
    const lastTime = lastMessage?.createdAt ? formatMessageTime(lastMessage.createdAt) : "";

    return (
      <button
        key={user._id}
        onClick={() => setSelectedUser(user)}
        className={`w-full flex items-center gap-3.5 p-3.5 mx-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
          isSelected 
            ? "bg-primary/10 shadow-soft" 
            : "hover:bg-slate-50 dark:hover:bg-slate-800"
        }`}
      >
        <div className="relative">
          <Avatar src={user.profilePic} size="md" />
          {isOnline && <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-white dark:ring-slate-800" aria-label="Online" />}
        </div>
        <div className="flex-1 min-w-0 text-left">
          <div className="flex justify-between items-center mb-0.5">
            <p className="font-semibold text-slate-900 dark:text-slate-100 truncate text-sm">{user.fullName}</p>
            <time className="text-[10px] text-slate-400 font-medium" dateTime={lastMessage?.createdAt}>{lastTime}</time>
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
        <Button
          variant="ghost"
          size="sm"
          className="p-2 rounded-xl"
          onClick={() => setSearchInput('')}
          title="New chat"
        >
          <Edit3 size={18} />
        </Button>
      </div>

      <div className="px-5 mb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearch}
            ref={searchRef}
            aria-label="Search chats"
            className="w-full pl-9 pr-4 py-2 rounded-2xl text-sm"
          />
        </div>
      </div>

      {!searchInput && <FrequentContacts users={frequentUsers} onSelectUser={setSelectedUser} />}

      <div className="flex-1 overflow-y-auto space-y-1 pt-2 pb-6">
        {pinnedUsers.length === 0 && unpinnedUsers.length === 0 ? (
          <div className="text-center py-10 px-4">
            <p className="text-slate-500 text-sm">No conversations yet.</p>
            <p className="text-slate-400 text-xs mt-1">Start by adding friends from the Friends tab!</p>
          </div>
        ) : (
          <>
            {pinnedUsers.map(renderUserItem)}
            {unpinnedUsers.map(renderUserItem)}
          </>
        )}
      </div>
    </aside>
  );
};

export default ConversationList;
