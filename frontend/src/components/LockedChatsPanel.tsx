import { useEffect, useState } from "react";
import ChatLockModal from "./ChatLockModal";
import { Shield, ShieldCheck } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const LockedChatsPanel = ({ onSelectUser }) => {
  const { lockedChats, getLockedChats, unlockChat } = useChatStore();
  const [activeChat, setActiveChat] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getLockedChats();
  }, [getLockedChats]);

  const handleOpenLockedChat = (chat) => {
    setActiveChat(chat);
    setShowModal(true);
  };

  const handleUnlockSubmit = async (chat, pin) => {
    const success = await unlockChat(chat._id, pin);
    if (success) {
      setShowModal(false);
      onSelectUser(chat);
    }
  };

  return (
    <div className="border-b border-slate-200 dark:border-slate-700 px-4 py-3 transition-colors duration-200">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100">
          <Shield className="size-5 text-amber-500" />
          Locked Chats
        </div>
        <button
          onClick={getLockedChats}
          className="text-xs font-semibold px-2 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-colors"
        >
          Refresh
        </button>
      </div>

      {lockedChats.length > 0 ? (
        <div className="space-y-2">
          {lockedChats.map((chat) => (
            <button
              key={chat._id}
              type="button"
              onClick={() => handleOpenLockedChat(chat)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/40 p-3 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800 dark:text-slate-150">{chat.fullName || chat.name}</span>
                <ShieldCheck className="size-4 text-emerald-500 dark:text-emerald-400" />
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">PIN protected</p>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold py-1">No locked chats yet.</p>
      )}

      <ChatLockModal
        chat={activeChat}
        open={showModal}
        onSubmit={handleUnlockSubmit}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default LockedChatsPanel;
