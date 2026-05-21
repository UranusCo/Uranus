import { formatDistanceToNow } from "../lib/utils";
import { MessageSquare, AtSign, Reply, UserPlus, Heart, Bell, Shield, Info } from "lucide-react";
import { useNotificationStore } from "../store/useNotificationStore";
import { useChatStore } from "../store/useChatStore";
import { useNavigate } from "react-router-dom";

const NotificationItem = ({ notification, onClose }) => {
  const { markAsRead, deleteNotification } = useNotificationStore();
  const { setSelectedUser } = useChatStore();
  const navigate = useNavigate();

  const getIcon = () => {
    switch (notification.type) {
      case "direct_message":
      case "group_message":
        return <MessageSquare className="size-4 text-blue-500" />;
      case "mention":
        return <AtSign className="size-4 text-purple-500" />;
      case "reply":
        return <Reply className="size-4 text-green-500" />;
      case "friend_request":
      case "friend_accept":
      case "follow":
        return <UserPlus className="size-4 text-pink-500" />;
      case "reaction":
        return <Heart className="size-4 text-red-500" />;
      case "security":
        return <Shield className="size-4 text-orange-500" />;
      case "welcome":
      case "announcement":
        return <Info className="size-4 text-yellow-500" />;
      default:
        return <Bell className="size-4 text-gray-500" />;
    }
  };

  const handleClick = async () => {
    if (!notification.isRead) {
      await markAsRead(notification._id);
    }

    if (notification.metadata?.conversationId) {
      // Find user and select them
      const { users } = useChatStore.getState();
      const user = users.find(u => u._id === notification.metadata.conversationId);
      if (user) {
        setSelectedUser(user);
        navigate("/");
      }
    }

    if (onClose) onClose();
  };

  return (
    <div
      className={`p-3 flex gap-3 hover:bg-slate-100 dark:hover:bg-slate-750/50 cursor-pointer transition-colors relative group ${
        !notification.isRead ? "bg-slate-100/50 dark:bg-slate-700/30" : ""
      }`}
      onClick={handleClick}
    >
      {!notification.isRead && (
        <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
      )}

      <div className="relative">
        <img
          src={notification.actor?.profilePic || "/avatar.png"}
          alt={notification.actor?.fullName}
          className="size-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
        />
        <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-slate-700">
          {getIcon()}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <p className="text-sm font-semibold truncate text-slate-800 dark:text-slate-100">{notification.title}</p>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 whitespace-nowrap">
            {formatDistanceToNow(new Date(notification.createdAt))}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
          {notification.body}
        </p>
      </div>

      <button
        className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 text-[10px] font-semibold text-red-500 hover:text-red-600 dark:text-red-400 transition-opacity"
        onClick={(e) => {
          e.stopPropagation();
          deleteNotification(notification._id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default NotificationItem;
