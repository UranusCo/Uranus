import React, { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { useNotificationStore } from "../store/useNotificationStore";
import { useAuthStore } from "../store/useAuthStore";
import NotificationPanel from "./NotificationPanel";

const NotificationBell = ({ hideText = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount, getUnreadCount, subscribeToNotifications, unsubscribeFromNotifications } = useNotificationStore();
  const { authUser, socket } = useAuthStore();
  const bellRef = useRef(null);

  useEffect(() => {
    if (authUser && socket) {
      getUnreadCount();
      subscribeToNotifications();
    }
    return () => {
      if (socket) unsubscribeFromNotifications();
    };
  }, [authUser, socket]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={bellRef}>
      <button
        className={hideText 
          ? `size-10 flex items-center justify-center rounded-xl bg-slate-200/50 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all duration-200 active:scale-95 ${unreadCount > 0 ? "text-blue-500 dark:text-blue-400" : ""}`
          : `px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-xl font-medium flex items-center gap-2 transition-all active:scale-[0.98] ${unreadCount > 0 ? "text-blue-500 dark:text-blue-400" : ""}`
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative">
          <Bell className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white dark:bg-blue-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center animate-pulse">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>
        {!hideText && <span className="hidden sm:inline">Notifications</span>}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
          <NotificationPanel onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
