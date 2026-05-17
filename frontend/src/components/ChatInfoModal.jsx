import React from 'react';

const ChatInfoModal = ({ open, onClose, user, chatSettings }) => {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-3xl border border-base-300 bg-base-100 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-300">
          <div>
            <h2 className="text-xl font-semibold">Conversation Info</h2>
            <p className="text-sm text-zinc-500">{user.fullName || user.name}</p>
          </div>
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <img src={user.profilePic || '/avatar.png'} alt={user.fullName || user.name} className="size-20 rounded-full border" />
            <div>
              <div className="font-medium">{user.fullName || user.name}</div>
              <div className="text-sm text-zinc-500">{user.email || ''}</div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Settings</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-3 rounded-lg border bg-base-200">Disappearing: {chatSettings?.expiryLabel || 'Off'}</div>
              <div className="p-3 rounded-lg border bg-base-200">Locked: {chatSettings?.isLocked ? 'Yes' : 'No'}</div>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <button className="btn btn-ghost" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInfoModal;
