import React from 'react';
import { Avatar } from './ui/BlinkComponents';

const FrequentContacts = ({ users, onSelectUser }) => {
  if (!users || users.length === 0) return null;

  return (
    <div className="px-5 py-4 border-b border-border dark:border-border-dark">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Frequent</h3>
      <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-none">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => onSelectUser(user)}
            className="flex flex-col items-center gap-2 group"
          >
            <Avatar src={user.profilePic} size="lg" className="transition-transform group-hover:scale-105" />
            <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 truncate w-12 text-center">
              {user.fullName.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FrequentContacts;
