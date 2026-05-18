import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const UserProfileModal = ({ open, onClose, user }) => {
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 transition-all duration-200">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xl overflow-hidden animate-fadeIn">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{user.fullName || user.name}</h2>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mt-0.5">Profile</p>
          </div>
          <button className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs rounded-xl font-semibold transition-all active:scale-[0.98]" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-4">
            <img src={user.profilePic || '/avatar.png'} alt={user.fullName || user.name} className="size-20 rounded-full border border-slate-200 dark:border-slate-700 object-cover" />
            <div>
              <div className="font-bold text-lg text-slate-800 dark:text-slate-100">{user.fullName || user.name}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{user.email || ''}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">About</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">{user.about || 'No profile description provided.'}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Joined</h4>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    portalRoot
  );
};

export default UserProfileModal;
