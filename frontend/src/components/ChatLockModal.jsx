import { useState } from "react";

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

  if (!open || !chat) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-sm rounded-3xl bg-base-100 border border-base-300 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-4 border-b border-base-300">
          <div>
            <h2 className="text-lg font-semibold">Unlock locked chat</h2>
            <p className="text-sm text-zinc-500">Enter the PIN to access {chat.fullName || chat.name}.</p>
          </div>
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
        <div className="space-y-4 p-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="PIN code"
            className="w-full input input-bordered rounded-2xl"
          />
          {error && <p className="text-sm text-error">{error}</p>}
          <button className="btn btn-primary w-full" type="button" onClick={handleSubmit}>
            Unlock
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatLockModal;
