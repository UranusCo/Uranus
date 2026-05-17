import React, { useEffect, useState } from "react";
import { useNotificationStore } from "../store/useNotificationStore";
import NotificationItem from "./NotificationItem";
import { Bell, CheckCircle, Trash2, X } from "lucide-react";

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
  }, [unreadOnly]);

  return (
    <div className="flex flex-col h-full max-h-[500px] w-[calc(100vw-2rem)] sm:w-[350px] bg-base-100 shadow-xl border border-base-300 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-base-300 flex items-center justify-between bg-base-100 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Bell className="size-5 text-primary" />
          <h3 className="font-bold">Notifications</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="btn btn-ghost btn-xs text-primary"
            onClick={markAllAsRead}
            title="Mark all as read"
          >
            <CheckCircle className="size-4" />
          </button>
          <button className="btn btn-ghost btn-xs" onClick={onClose}>
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-2 border-b border-base-300 flex gap-2 overflow-x-auto bg-base-50">
        <button
          className={`btn btn-xs rounded-full ${!unreadOnly ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setUnreadOnly(false)}
        >
          All
        </button>
        <button
          className={`btn btn-xs rounded-full ${unreadOnly ? "btn-primary" : "btn-ghost"}`}
          onClick={() => setUnreadOnly(true)}
        >
          Unread
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto divide-y divide-base-300">
        {notifications.length === 0 ? (
          <div className="p-8 text-center flex flex-col items-center gap-3">
            <Bell className="size-12 text-base-content/20" />
            <p className="text-base-content/50">No notifications yet</p>
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
                  className="btn btn-ghost btn-sm text-primary"
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
      <div className="p-2 border-t border-base-300 text-center bg-base-200/50">
        <button
          className="btn btn-ghost btn-xs w-full text-base-content/50 hover:text-primary transition-colors"
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
