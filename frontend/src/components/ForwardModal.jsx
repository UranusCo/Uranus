import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { X, Search, Loader } from "lucide-react";
import toast from "react-hot-toast";

const ForwardModal = ({ messageId, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isForwarding, setIsForwarding] = useState(false);
  const { users, forwardMessage } = useChatStore();
  const { authUser } = useAuthStore();

  const filteredUsers = users.filter(
    (user) =>
      user._id !== authUser._id &&
      (user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleForward = async () => {
    if (selectedUsers.length === 0) {
      toast.error("Please select at least one user");
      return;
    }

    try {
      setIsForwarding(true);
      for (const userId of selectedUsers) {
        await forwardMessage(messageId, userId);
      }
      toast.success(`Message forwarded to ${selectedUsers.length} user${selectedUsers.length > 1 ? "s" : ""}`);
      onClose();
    } catch (error) {
      console.error("Failed to forward message:", error);
      toast.error("Failed to forward message");
    } finally {
      setIsForwarding(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Forward Message</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-base-200 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Input */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Search users</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="input input-bordered input-sm w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content opacity-50" />
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <label
                key={user._id}
                className="flex items-center gap-3 p-3 hover:bg-base-200 rounded-lg cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => toggleUserSelection(user._id)}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{user.fullName}</p>
                  <p className="text-xs opacity-60 truncate">{user.email}</p>
                </div>
                {user.status === "online" && (
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </label>
            ))
          ) : (
            <p className="text-center text-sm opacity-60 py-4">
              {searchQuery ? "No users found" : "No users available"}
            </p>
          )}
        </div>

        {/* Selected Count */}
        {selectedUsers.length > 0 && (
          <div className="text-sm opacity-60 mb-4">
            {selectedUsers.length} user{selectedUsers.length > 1 ? "s" : ""} selected
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            disabled={isForwarding}
          >
            Cancel
          </button>
          <button
            onClick={handleForward}
            className="btn btn-primary btn-sm"
            disabled={selectedUsers.length === 0 || isForwarding}
          >
            {isForwarding ? (
              <>
                <Loader size={16} className="animate-spin" />
                Forwarding...
              </>
            ) : (
              "Forward"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForwardModal;
