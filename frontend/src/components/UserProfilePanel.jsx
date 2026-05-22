import React from 'react';

const UserProfilePanel = ({ user, onClose, isOpen }) => {
  if (!user || !isOpen) return null;

  return (
    <div className={`fixed inset-y-0 right-0 z-[100] w-full md:w-[350px] bg-surface dark:bg-surface-dark border-l border-border dark:border-border-dark shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-border dark:border-border-dark">
          <h2 className="font-bold text-slate-900 dark:text-slate-100">Contact Info</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"><X size={20} /></button>
        </div>

        {/* Profile Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center">
          <div className="size-24 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800 mb-4 shadow-soft">
            <img src={user.profilePic || "/avatar.png"} alt={user.fullName} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">{user.fullName}</h1>
          <p className="text-slate-500 mb-6 text-sm">{user.email}</p>
          
          <div className="w-full flex gap-2">
            <button className="flex-1 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold text-sm transition-all shadow-soft">Message</button>
            <button className="px-4 py-2 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl text-slate-700 dark:text-slate-300 transition-all hover:bg-slate-50 dark:hover:bg-slate-800">Mute</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePanel;
