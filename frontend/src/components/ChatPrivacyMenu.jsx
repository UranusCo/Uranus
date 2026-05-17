import { useEffect, useState } from "react";
import { Lock, Unlock, Clock3 } from "lucide-react";

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
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-3xl border border-base-300 bg-base-100 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-base-300">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">Privacy</p>
            <h2 className="text-xl font-semibold">{selectedUser.fullName || selectedUser.name}</h2>
          </div>
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
        <div className="space-y-5 p-5">
          <div className="rounded-3xl border border-base-300 bg-base-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <Clock3 className="size-5" />
              <div>
                <h3 className="font-semibold">Disappearing messages</h3>
                <p className="text-sm text-zinc-500">Messages will expire based on your selection.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {expirationOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setExpiryOption(option.value)}
                  className={`rounded-2xl border px-3 py-2 text-sm transition ${expiryOption === option.value ? "border-primary bg-primary/10" : "border-base-300 bg-base-100 hover:bg-base-200"}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleSaveExpiry}
              className="mt-4 btn btn-primary w-full"
            >
              Save expiry
            </button>
          </div>

          <div className="rounded-3xl border border-base-300 bg-base-200 p-4">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="size-5" />
              <div>
                <h3 className="font-semibold">Chat lock</h3>
                <p className="text-sm text-zinc-500">Move this chat into locked conversations.</p>
              </div>
            </div>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              className="w-full input input-bordered rounded-2xl"
            />
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={locked ? handleUnlock : handleLock}
                className="btn btn-primary flex-1"
              >
                {locked ? "Unlock chat" : "Lock chat"}
              </button>
              <button
                type="button"
                onClick={() => setPin("")}
                className="btn btn-ghost flex-1"
              >
                Clear
              </button>
            </div>
          </div>

          {statusMessage && (
            <p className="rounded-2xl bg-success/10 border border-success/20 p-3 text-sm text-success">{statusMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPrivacyMenu;
