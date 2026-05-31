import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useFriendStore } from "../store/useFriendStore";
import { useAuthStore } from "../store/useAuthStore";
import { HELP_CENTER_EMAIL } from "../constants";
import {
  Search,
  UserPlus,
  UserCheck,
  UserX,
  MessageSquare,
  Ban,
  Users,
  Inbox,
  Globe,
} from "lucide-react";
import { getUserHandle } from "../lib/utils";
import { Link } from "react-router-dom";
const UsersPanel = ({ setActiveTab }) => {
  const { getUsers, users, isUsersLoading, setSelectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  const {
    friends,
    requests,
    sentRequests,
    sendRequest,
    acceptRequest,
    declineRequest,
    blockUser,
  } = useFriendStore();

  const { onlineUsers } = useAuthStore();
  const [searchInput, setSearchInput] = useState("");
  const [activeSubTab, setActiveSubTab] = useState("explore"); // explore, friends, requests

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    const handleExplore = () => setActiveSubTab("explore");
    const handleFriends = () => setActiveSubTab("friends");
    const handleRequests = () => setActiveSubTab("requests");
    window.addEventListener("friends-tab-explore", handleExplore);
    window.addEventListener("friends-tab-friends", handleFriends);
    window.addEventListener("friends-tab-requests", handleRequests);
    return () => {
      window.removeEventListener("friends-tab-explore", handleExplore);
      window.removeEventListener("friends-tab-friends", handleFriends);
      window.removeEventListener("friends-tab-requests", handleRequests);
    };
  }, []);

  // Filter out self and blocked users
  const isUserBlocked = (userId) => {
    return authUser?.blockedUsers?.includes(userId);
  };

  const getRelationshipState = (userId) => {
    if (friends.some((f) => f._id === userId)) {
      return "friends";
    }
    if (requests.some((r) => r.requesterId?._id === userId)) {
      return "request_received";
    }
    if (sentRequests.some((r) => r.receiverId?._id === userId)) {
      return "request_sent";
    }
    return "not_friends";
  };

  // Determine which list to render
  let displayUsers = [];
  if (activeSubTab === "explore") {
    // Show all users except self and blocked
    displayUsers = users.filter((u) => u._id !== authUser?._id && !isUserBlocked(u._id));
  } else if (activeSubTab === "friends") {
    // Show friends list
    displayUsers = friends.filter((u) => !isUserBlocked(u._id));
  } else if (activeSubTab === "requests") {
    // Combine incoming and outgoing
    // We will render them with specific subheaders
  }

  // Apply search filtering
  const filterBySearch = (list) => {
    return list.filter(
      (u) =>
        u.fullName.toLowerCase().includes(searchInput.toLowerCase()) ||
        u.email.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  const handleMessageClick = (user) => {
    setSelectedUser(user);
    if (setActiveTab) setActiveTab("chats");
  };

  const totalRequestsCount = requests.length;

  return (
    <div data-context="friends-section" className="h-full w-full bg-white dark:bg-slate-800 flex flex-col transition-all duration-200 border-r border-slate-200 dark:border-slate-700 select-none animate-fadeIn">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 flex-shrink-0">
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          People
        </h2>
        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
          Find and connect with people on Blink
        </p>

        {/* Search */}
        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Search people..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 dark:text-slate-500" />
        </div>

        {/* Sub-Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-700/50 mt-4 gap-4 text-sm font-bold">
          <button
            onClick={() => setActiveSubTab("explore")}
            className={`pb-2.5 flex items-center gap-1.5 transition-colors relative ${
              activeSubTab === "explore"
                ? "text-blue-500"
                : "text-slate-400 hover:text-slate-500 dark:hover:text-slate-350"
            }`}
          >
            <Globe className="w-4 h-4" />
            Explore
            {activeSubTab === "explore" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveSubTab("friends")}
            className={`pb-2.5 flex items-center gap-1.5 transition-colors relative ${
              activeSubTab === "friends"
                ? "text-blue-500"
                : "text-slate-400 hover:text-slate-500 dark:hover:text-slate-350"
            }`}
          >
            <Users className="w-4 h-4" />
            Friends
            {friends.length > 0 && (
              <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-350 px-1.5 py-0.5 rounded-full">
                {friends.length}
              </span>
            )}
            {activeSubTab === "friends" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveSubTab("requests")}
            className={`pb-2.5 flex items-center gap-1.5 transition-colors relative ${
              activeSubTab === "requests"
                ? "text-blue-500"
                : "text-slate-400 hover:text-slate-500 dark:hover:text-slate-350"
            }`}
          >
            <Inbox className="w-4 h-4" />
            Requests
            {totalRequestsCount > 0 && (
              <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full font-bold animate-pulse">
                {totalRequestsCount}
              </span>
            )}
            {activeSubTab === "requests" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>
        </div>
      </div>

      {/* Users List Container */}
      <div className="flex-grow overflow-y-auto px-5 pb-6 space-y-3">
        {isUsersLoading ? (
          <div className="flex flex-col items-center justify-center py-10 gap-2">
            <div className="size-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
            <p className="text-xs text-slate-400 font-semibold">Loading people...</p>
          </div>
        ) : activeSubTab !== "requests" ? (
          /* Explore and Friends Tab */
          filterBySearch(displayUsers).length > 0 ? (
            filterBySearch(displayUsers).map((user) => {
              const isOnline = onlineUsers.includes(user._id);
              const isHelpCenter = user.email === HELP_CENTER_EMAIL;
              const relState = isHelpCenter ? "friends" : getRelationshipState(user._id);

              return (
                <div
                  key={user._id}
                  data-context="conversation"
                  data-user-id={user._id}
                  className="flex items-center justify-between p-3.5 bg-slate-50/60 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800 rounded-2xl transition-all hover:bg-slate-50 dark:hover:bg-slate-900/40"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative flex-shrink-0">
                      <img
                        src={user.profilePic || "/avatar.png"}
                        alt={user.fullName}
                        className="size-11 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                      />
                      {isOnline ? (
                        <div className="absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800" />
                      ) : (
                        <div className="absolute bottom-0 right-0 size-3 bg-slate-350 dark:bg-slate-600 rounded-full border-2 border-white dark:border-slate-800" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate flex items-center gap-1.5">
                        {user.fullName}
                        <Link
                          to={`/u/${getUserHandle(user).replace("@", "")}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[11px] text-primary hover:underline font-bold opacity-80"
                        >
                          {getUserHandle(user)}
                        </Link>
                        {isHelpCenter && (
                          <span className="text-[10px] bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded-full font-bold select-none">
                            Support
                          </span>
                        )}
                      </h4>
                      <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate font-semibold mt-0.5">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 ml-2 flex-shrink-0">
                    {relState === "not_friends" && (
                      <button
                        onClick={() => sendRequest(user._id)}
                        className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-[11px] font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                      >
                        <UserPlus size={13} />
                        Add Friend
                      </button>
                    )}

                    {relState === "request_sent" && (
                      <button
                        disabled
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-750 text-slate-450 dark:text-slate-500 text-[11px] font-bold rounded-xl flex items-center gap-1.5 cursor-not-allowed border border-slate-200/50 dark:border-slate-700/50"
                      >
                        <UserCheck size={13} />
                        Requested
                      </button>
                    )}

                    {relState === "request_received" && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => acceptRequest(user._id)}
                          className="p-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all shadow-sm active:scale-95"
                          title="Accept Request"
                        >
                          <UserCheck size={14} />
                        </button>
                        <button
                          onClick={() => declineRequest(user._id)}
                          className="p-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl transition-all shadow-sm active:scale-95"
                          title="Decline Request"
                        >
                          <UserX size={14} />
                        </button>
                      </div>
                    )}

                    {relState === "friends" && (
                      <button
                        onClick={() => handleMessageClick(user)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-[11px] font-bold rounded-xl flex items-center gap-1.5 transition-all active:scale-95"
                      >
                        <MessageSquare size={13} />
                        Message
                      </button>
                    )}

                    {/* Block option */}
                    <button
                      onClick={() => blockUser(user._id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-colors"
                      title="Block User"
                    >
                      <Ban size={13} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 flex flex-col items-center justify-center">
              <Globe className="w-10 h-10 text-slate-300 dark:text-slate-655 mb-2.5" />
              <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                {searchInput ? "No matching profiles found" : "No users found"}
              </p>
            </div>
          )
        ) : (
          /* Requests Tab */
          <div className="space-y-6">
            {/* Incoming Requests */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-3 flex items-center gap-1.5">
                Incoming Requests ({requests.length})
              </h3>
              {filterBySearch(requests.map((r) => r.requesterId)).length > 0 ? (
                <div className="space-y-3">
                  {filterBySearch(requests.map((r) => r.requesterId)).map((requester) => {
                    const isOnline = onlineUsers.includes(requester._id);

                    return (
                      <div
                        key={requester._id}
                        data-context="conversation"
                        data-user-id={requester._id}
                        className="flex items-center justify-between p-3.5 bg-slate-50/60 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800 rounded-2xl"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative flex-shrink-0">
                            <img
                              src={requester.profilePic || "/avatar.png"}
                              alt={requester.fullName}
                              className="size-11 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                            />
                            {isOnline ? (
                              <div className="absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800" />
                            ) : (
                              <div className="absolute bottom-0 right-0 size-3 bg-slate-350 dark:bg-slate-600 rounded-full border-2 border-white dark:border-slate-800" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate flex items-center gap-1.5">
                              {requester.fullName}
                              <Link
                                to={`/u/${getUserHandle(requester).replace("@", "")}`}
                                onClick={(e) => e.stopPropagation()}
                                className="text-[11px] text-primary hover:underline font-bold opacity-80"
                              >
                                {getUserHandle(requester)}
                              </Link>
                            </h4>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate font-semibold mt-0.5">
                              {requester.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 ml-2">
                          <button
                            onClick={() => acceptRequest(requester._id)}
                            className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-650 text-white text-[11px] font-bold rounded-xl flex items-center gap-1 transition-all shadow-sm active:scale-95"
                          >
                            <UserCheck size={12} />
                            Accept
                          </button>
                          <button
                            onClick={() => declineRequest(requester._id)}
                            className="px-2.5 py-1.5 bg-rose-500 hover:bg-rose-600 text-white text-[11px] font-bold rounded-xl flex items-center gap-1 transition-all shadow-sm active:scale-95"
                          >
                            <UserX size={12} />
                            Decline
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold italic pl-1">
                  No incoming requests
                </p>
              )}
            </div>

            {/* Outgoing Requests */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-3 flex items-center gap-1.5">
                Sent Requests ({sentRequests.length})
              </h3>
              {filterBySearch(sentRequests.map((r) => r.receiverId)).length > 0 ? (
                <div className="space-y-3">
                  {filterBySearch(sentRequests.map((r) => r.receiverId)).map((receiver) => {
                    const isOnline = onlineUsers.includes(receiver._id);

                    return (
                      <div
                        key={receiver._id}
                        data-context="conversation"
                        data-user-id={receiver._id}
                        className="flex items-center justify-between p-3.5 bg-slate-50/60 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800 rounded-2xl"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative flex-shrink-0">
                            <img
                              src={receiver.profilePic || "/avatar.png"}
                              alt={receiver.fullName}
                              className="size-11 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                            />
                            {isOnline ? (
                              <div className="absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-800" />
                            ) : (
                              <div className="absolute bottom-0 right-0 size-3 bg-slate-350 dark:bg-slate-600 rounded-full border-2 border-white dark:border-slate-800" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 truncate flex items-center gap-1.5">
                              {receiver.fullName}
                              <Link
                                to={`/u/${getUserHandle(receiver).replace("@", "")}`}
                                onClick={(e) => e.stopPropagation()}
                                className="text-[11px] text-primary hover:underline font-bold opacity-80"
                              >
                                {getUserHandle(receiver)}
                              </Link>
                            </h4>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate font-semibold mt-0.5">
                              {receiver.email}
                            </p>
                          </div>
                        </div>

                        <button
                          disabled
                          className="px-3 py-1.5 bg-slate-100 dark:bg-slate-750 text-slate-400 dark:text-slate-500 text-[11px] font-bold rounded-xl flex items-center gap-1 border border-slate-200/50 dark:border-slate-700/50 cursor-not-allowed"
                        >
                          <UserCheck size={12} />
                          Requested
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold italic pl-1">
                  No sent requests
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPanel;

