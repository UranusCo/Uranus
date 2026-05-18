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
        className="relative w-full max-w-[220px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-left"
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white text-xs uppercase tracking-[0.15em]">
          {overlayText}
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            {hasOpened ? <EyeOff size={16} /> : <Eye size={16} />}
            <span className="font-semibold text-slate-800 dark:text-slate-200">View once media</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Tap to unlock the content one time only.</p>
        </div>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden animate-fadeIn">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 font-semibold">One-time view</p>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{message.file?.name || "Secure media"}</h2>
              </div>
              <button onClick={closeModal} className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 transition-colors">
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
                <div className="rounded-2xl bg-slate-100 dark:bg-slate-900/40 p-4">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">{message.file.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{message.file.type}</p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">This file will only be visible once.</p>
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-100 dark:bg-slate-900/40 p-6 text-center text-sm text-slate-500">
                  No content to display.
                </div>
              )}
              <p className="text-xs text-slate-400 dark:text-slate-500">Right-click and screenshots are discouraged. This content will be marked opened after you close it.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewOnceMedia;
