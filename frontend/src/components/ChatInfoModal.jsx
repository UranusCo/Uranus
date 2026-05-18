import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const ChatInfoModal = ({ open, onClose, user, chatSettings }) => {
  const [portalRoot, setPortalRoot] = useState(null);

  useEffect(() => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    setPortalRoot(element);

    return () => {
      document.body.removeChild(element);
    };
  }, []);

  if (!open || !user || !portalRoot) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xl overflow-hidden max-h-[90vh] animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-3 px-5 py-4 border-b border-slate-200 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Conversation Info</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{user.fullName || user.name}</p>
          </div>
          <button className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs rounded-xl font-semibold transition-all active:scale-[0.98] self-start sm:self-auto" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <img src={user.profilePic || '/avatar.png'} alt={user.fullName || user.name} className="size-20 rounded-full border border-slate-200 dark:border-slate-700 object-cover flex-shrink-0" />
            <div className="min-w-0">
              <div className="font-bold text-slate-800 dark:text-slate-100 text-lg truncate">{user.fullName || user.name}</div>
              <div className="text-xs text-slate-400 dark:text-slate-500 font-semibold truncate">{user.email || 'No email available'}</div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Settings</h4>
            <div className="grid grid-cols-1 gap-2.5 text-sm sm:grid-cols-2">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-750 dark:text-slate-200 font-bold text-xs uppercase tracking-wider">
                Disappearing: <span className="text-blue-500 dark:text-blue-400 ml-1 font-bold">{chatSettings?.expiryLabel || 'Off'}</span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-750 dark:text-slate-200 font-bold text-xs uppercase tracking-wider">
                Locked: <span className="text-blue-500 dark:text-blue-400 ml-1 font-bold">{chatSettings?.isLocked ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    portalRoot
  );
};

export default ChatInfoModal;
