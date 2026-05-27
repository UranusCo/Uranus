import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { X, Loader } from "lucide-react";
import toast from "react-hot-toast";

const StatusUpdateModal = ({ onClose }) => {
  const { updateUserStatus } = useChatStore();
  const [status, setStatus] = useState("online");
  const [statusMessage, setStatusMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const statuses = [
    { value: "online", label: "🟢 Online", color: "text-green-500" },
    { value: "away", label: "🟡 Away", color: "text-yellow-500" },
    { value: "dnd", label: "🔴 Do Not Disturb", color: "text-red-500" },
    { value: "offline", label: "⚫ Offline", color: "text-gray-500" },
  ];

  const handleUpdate = async () => {
    if (!status.trim()) {
      toast.error("Please select a status");
      return;
    }

    try {
      setIsUpdating(true);
      await updateUserStatus(status, statusMessage.trim() || "");
      toast.success("Status updated!");
      onClose();
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md border border-slate-200/50 dark:border-slate-700/50 p-6 overflow-hidden animate-fadeIn">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Update Status</h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Status options */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            Status
          </label>
          <div className="space-y-2">
            {statuses.map((s) => (
              <label key={s.value} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/40 rounded-xl cursor-pointer transition-all duration-150 border border-slate-100/30 dark:border-slate-700/30">
                <input
                  type="radio"
                  name="status"
                  value={s.value}
                  checked={status === s.value}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-4 h-4 text-blue-500 border-slate-350 focus:ring-blue-500 dark:focus:ring-blue-400 bg-transparent cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{s.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status message */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            Status Message (Optional)
          </label>
          <textarea
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/40 border border-slate-250 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm resize-none h-20"
            placeholder='e.g., "In a meeting", "Away for 2 hours"'
            value={statusMessage}
            onChange={(e) => setStatusMessage(e.target.value.slice(0, 50))}
            maxLength={50}
          />
          <span className="block text-right text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            {statusMessage.length}/50
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm rounded-xl font-medium transition-all active:scale-[0.98]"
            disabled={isUpdating}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700 text-sm rounded-xl font-medium flex items-center gap-1.5 transition-all active:scale-[0.98] shadow-sm"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <Loader size={15} className="animate-spin" />
                Updating...
              </>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdateModal;
