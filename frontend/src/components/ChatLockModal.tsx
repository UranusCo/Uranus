import { useState, useEffect } from "react";

const ChatLockModal = ({ chat, open, onSubmit, onClose }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!pin || pin.length < 4) {
      setError("Enter at least 4 digits");
      return;
    }
    setError("");
    await onSubmit(chat, pin);
    setPin("");
  };

  useEffect(() => {
    if (!open || !chat) return;
    const handleClose = () => onClose();
    const handleConfirm = () => handleSubmit();
    window.addEventListener("close-active-modal", handleClose);
    window.addEventListener("submit-active-modal", handleConfirm);
    return () => {
      window.removeEventListener("close-active-modal", handleClose);
      window.removeEventListener("submit-active-modal", handleConfirm);
    };
  }, [open, chat, onClose, handleSubmit]);

  if (!open || !chat) return null;

  return (
    <div data-context="modal" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 transition-all duration-200">
      <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden animate-fadeIn">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Unlock Chat</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Enter the PIN to access {chat.fullName || chat.name}.</p>
          </div>
          <button className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs rounded-xl font-semibold transition-all active:scale-[0.98]" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="space-y-4 p-5">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN code"
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm"
          />
          {error && <p className="text-xs text-rose-500 font-semibold">{error}</p>}
          <button className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-sm animate-pulseFast" type="button" onClick={handleSubmit}>
            Unlock
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatLockModal;
