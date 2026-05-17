import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

const ViewOnceMedia = ({ message, onOpened }) => {
  const [showModal, setShowModal] = useState(false);
  const [hasOpened, setHasOpened] = useState(message.viewedOnce || false);

  const openModal = () => {
    if (hasOpened) return;
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    if (!hasOpened) {
      setHasOpened(true);
      onOpened();
    }
  };

  const overlayText = hasOpened ? "Opened" : "View once";

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        onContextMenu={(e) => e.preventDefault()}
        className="relative w-full max-w-[220px] rounded-xl overflow-hidden border border-base-300 bg-base-200 text-left"
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white text-xs uppercase tracking-[0.15em]">
          {overlayText}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            {hasOpened ? <EyeOff size={16} /> : <Eye size={16} />}
            <span className="font-semibold">View once media</span>
          </div>
          <p className="text-sm text-zinc-300">Tap to unlock the content one time only.</p>
        </div>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="relative w-full max-w-2xl rounded-3xl bg-base-100 border border-base-300 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-base-300">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">One-time view</p>
                <h2 className="text-lg font-semibold">{message.file?.name || "Secure media"}</h2>
              </div>
              <button onClick={closeModal} className="btn btn-ghost btn-sm">
                <X size={18} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {message.image ? (
                <img
                  src={message.image}
                  alt="View once"
                  className="w-full rounded-2xl object-contain"
                  onContextMenu={(e) => e.preventDefault()}
                />
              ) : message.file ? (
                <div className="rounded-2xl bg-base-200 p-4">
                  <p className="font-semibold">{message.file.name}</p>
                  <p className="text-sm text-zinc-500">{message.file.type}</p>
                  <p className="mt-2 text-sm">This file will only be visible once.</p>
                </div>
              ) : (
                <div className="rounded-2xl bg-base-200 p-6 text-center text-sm text-zinc-500">
                  No content to display.
                </div>
              )}
              <p className="text-sm text-zinc-400">Right-click and screenshots are discouraged. This content will be marked opened after you close it.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewOnceMedia;
