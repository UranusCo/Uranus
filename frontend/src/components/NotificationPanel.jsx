import { useEffect, useState } from "react";
import { useNotificationStore } from "../store/useNotificationStore";
import NotificationItem from "./NotificationItem";
import { Bell, CheckCircle, X } from "lucide-react";

const NotificationPanel = ({ onClose }) => {
  const {
    notifications,
    getNotifications,
    markAllAsRead,
    isNotificationsLoading,
    loadMoreNotifications,
    hasMore,
  } = useNotificationStore();
  
  const [unreadOnly, setUnreadOnly] = useState(false);

  useEffect(() => {
    getNotifications(unreadOnly);
  }, [unreadOnly, getNotifications]);

  return (
    <div className="flex flex-col h-full max-h-[500px] w-[calc(100vw-2rem)] sm:w-[350px] bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden transition-colors duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-white dark:bg-slate-800 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Bell className="size-5 text-blue-500 dark:text-blue-400" />
          <h3 className="font-bold text-slate-800 dark:text-slate-100">Notifications</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-blue-500 dark:text-blue-400 transition-colors"
            onClick={markAllAsRead}
            title="Mark all as read"
          >
            <CheckCircle className="size-4" />
          </button>
          <button className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 transition-colors" onClick={onClose}>
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex gap-2 overflow-x-auto bg-slate-50 dark:bg-slate-900/40">
        <button
          className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all ${!unreadOnly ? "bg-blue-500 text-white" : "text-slate-600 dark:text-slate-350 hover:bg-slate-200/50 dark:hover:bg-slate-700/50"}`}
          onClick={() => setUnreadOnly(false)}
        >
          All
        </button>
        <button
          className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all ${unreadOnly ? "bg-blue-500 text-white" : "text-slate-600 dark:text-slate-350 hover:bg-slate-200/50 dark:hover:bg-slate-700/50"}`}
          onClick={() => setUnreadOnly(true)}
        >
          Unread
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-750">
        {notifications.length === 0 ? (
          <div className="p-8 text-center flex flex-col items-center gap-3">
            <Bell className="size-12 text-slate-300 dark:text-slate-600" />
            <p className="text-slate-400 dark:text-slate-500 text-sm">No notifications yet</p>
          </div>
        ) : (
          <>
            {notifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                onClose={onClose}
              />
            ))}
            {hasMore && (
              <div className="p-4 text-center">
                <button
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-blue-500 dark:text-blue-400 text-xs rounded-lg font-medium transition-colors"
                  onClick={() => loadMoreNotifications(unreadOnly)}
                  disabled={isNotificationsLoading}
                >
                  {isNotificationsLoading ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-slate-200 dark:border-slate-700 text-center bg-slate-50 dark:bg-slate-900/30">
        <button
          className="w-full text-xs font-medium text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors py-1"
          onClick={() => {
            // Future: Navigate to a full notifications page
          }}
        >
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationPanel;
