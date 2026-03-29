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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Update Status</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-base-200 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Status options */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <div className="space-y-2">
            {statuses.map((s) => (
              <label key={s.value} className="flex items-center gap-3 p-3 hover:bg-base-200 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value={s.value}
                  checked={status === s.value}
                  onChange={(e) => setStatus(e.target.value)}
                  className="radio radio-primary"
                />
                <span className="text-sm">{s.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Status message */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Status Message (Optional)</span>
          </label>
          <textarea
            className="textarea textarea-bordered textarea-sm"
            placeholder='e.g., "In a meeting", "Away for 2 hours"'
            value={statusMessage}
            onChange={(e) => setStatusMessage(e.target.value.slice(0, 50))}
            maxLength={50}
          />
          <label className="label">
            <span className="label-text-alt">{statusMessage.length}/50</span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            disabled={isUpdating}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="btn btn-primary btn-sm"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <Loader size={16} className="animate-spin" />
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
