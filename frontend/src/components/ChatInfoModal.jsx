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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl border border-base-300 bg-base-100 shadow-2xl overflow-hidden max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-3 px-5 py-4 border-b border-base-300 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Conversation Info</h2>
            <p className="text-sm text-zinc-500">{user.fullName || user.name}</p>
          </div>
          <button className="btn btn-ghost self-start sm:self-auto" onClick={onClose}>Close</button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <img src={user.profilePic || '/avatar.png'} alt={user.fullName || user.name} className="size-20 rounded-full border" />
            <div className="min-w-0">
              <div className="font-medium truncate">{user.fullName || user.name}</div>
              <div className="text-sm text-zinc-500 truncate">{user.email || 'No email available'}</div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-2">Settings</h4>
            <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              <div className="p-3 rounded-lg border bg-base-200">Disappearing: {chatSettings?.expiryLabel || 'Off'}</div>
              <div className="p-3 rounded-lg border bg-base-200">Locked: {chatSettings?.isLocked ? 'Yes' : 'No'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    portalRoot
  );
};

export default ChatInfoModal;
