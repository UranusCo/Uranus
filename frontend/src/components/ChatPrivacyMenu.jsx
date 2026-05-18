import { useEffect, useState } from "react";
import { Lock, Clock3 } from "lucide-react";

const expirationOptions = [
  { label: "Off", value: "off" },
  { label: "24 Hours", value: "24h" },
  { label: "7 Days", value: "7d" },
  { label: "90 Days", value: "90d" },
];

const buildExpiry = (value) => {
  const now = new Date();
  if (value === "24h") now.setHours(now.getHours() + 24);
  if (value === "7d") now.setDate(now.getDate() + 7);
  if (value === "90d") now.setDate(now.getDate() + 90);
  return now;
};

const ChatPrivacyMenu = ({
  open,
  onClose,
  selectedUser,
  chatSettings,
  isLocked,
  onSetChatExpiry,
  onLockChat,
  onUnlockChat,
}) => {
  const [expiryOption, setExpiryOption] = useState("off");
  const [pin, setPin] = useState("");
  const [locked, setLocked] = useState(isLocked);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    setLocked(isLocked);
    if (selectedUser) {
      const settings = chatSettings[selectedUser._id];
      if (settings?.expiryLabel) {
        setExpiryOption(settings.expiryLabel);
      }
    }
  }, [selectedUser, chatSettings, isLocked]);

  const handleSaveExpiry = async () => {
    if (!selectedUser) return;
    const expiresAt = expiryOption === "off" ? null : buildExpiry(expiryOption);
    await onSetChatExpiry(selectedUser._id, expiryOption, expiresAt);
    setStatusMessage("Disappearing messages updated.");
  };

  const handleLock = async () => {
    if (!selectedUser) return;
    if (!pin || pin.length < 4) {
      setStatusMessage("PIN must be at least 4 digits.");
      return;
    }
    await onLockChat(selectedUser._id, pin);
    setLocked(true);
    setStatusMessage("Chat locked successfully.");
  };

  const handleUnlock = async () => {
    if (!selectedUser) return;
    const ok = await onUnlockChat(selectedUser._id, pin);
    if (ok) {
      setLocked(false);
      setStatusMessage("Chat unlocked.");
    }
  };

  if (!open || !selectedUser) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 transition-all duration-200">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xl overflow-hidden animate-fadeIn">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500">Privacy</p>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{selectedUser.fullName || selectedUser.name}</h2>
          </div>
          <button className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs rounded-xl font-semibold transition-all active:scale-[0.98]" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="space-y-5 p-5">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-4">
            <div className="flex items-center gap-3 mb-3">
              <Clock3 className="size-5 text-blue-500 dark:text-blue-400" />
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Disappearing messages</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Messages will expire based on your selection.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {expirationOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setExpiryOption(option.value)}
                  className={`rounded-xl border px-3 py-2 text-xs font-bold transition-all duration-200 ${expiryOption === option.value ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleSaveExpiry}
              className="mt-4 w-full py-2.5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-sm"
            >
              Save expiry
            </button>
          </div>

          <div className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-4">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="size-5 text-blue-500 dark:text-blue-400" />
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Chat lock</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Move this chat into locked conversations.</p>
              </div>
            </div>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-sm"
            />
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={locked ? handleUnlock : handleLock}
                className="flex-1 py-2.5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all active:scale-[0.98] shadow-sm"
              >
                {locked ? "Unlock chat" : "Lock chat"}
              </button>
              <button
                type="button"
                onClick={() => setPin("")}
                className="flex-1 py-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-750 dark:text-slate-200 rounded-xl font-bold text-sm transition-all active:scale-[0.98]"
              >
                Clear
              </button>
            </div>
          </div>

          {statusMessage && (
            <p className="rounded-2xl bg-emerald-500/10 border border-emerald-500/25 p-3 text-xs font-bold text-emerald-600 dark:text-emerald-400 text-center animate-fadeIn">{statusMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPrivacyMenu;
