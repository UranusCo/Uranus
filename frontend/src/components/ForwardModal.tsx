import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleClose = () => onClose();
    const handleSubmit = () => handleForward();
    window.addEventListener("close-active-modal", handleClose);
    window.addEventListener("submit-active-modal", handleSubmit);
    return () => {
      window.removeEventListener("close-active-modal", handleClose);
      window.removeEventListener("submit-active-modal", handleSubmit);
    };
  }, [onClose, handleForward]);

  return (
    <div data-context="modal" className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 w-full max-w-md p-6 shadow-2xl overflow-hidden animate-fadeIn">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Forward Message</h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
            Search users
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-1 max-h-64 overflow-y-auto mb-4 scrollbar-thin">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <label
                key={user._id}
                className="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/60 rounded-xl cursor-pointer transition-colors select-none"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-500 border-slate-350 dark:border-slate-600 rounded bg-transparent focus:ring-blue-500 focus:ring-1 cursor-pointer"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => toggleUserSelection(user._id)}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{user.fullName}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{user.email}</p>
                </div>
                {user.status === "online" && (
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </label>
            ))
          ) : (
            <p className="text-center text-xs font-semibold text-slate-400 dark:text-slate-500 py-6">
              {searchQuery ? "No users found" : "No users available"}
            </p>
          )}
        </div>

        {/* Selected Count */}
        {selectedUsers.length > 0 && (
          <div className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-wider">
            {selectedUsers.length} user{selectedUsers.length > 1 ? "s" : ""} selected
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2.5 justify-end border-t border-slate-100 dark:border-slate-700/50 pt-4 mt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-semibold text-xs transition-all active:scale-[0.98]"
            disabled={isForwarding}
          >
            Cancel
          </button>
          <button
            onClick={handleForward}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition-all active:scale-[0.98] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            disabled={selectedUsers.length === 0 || isForwarding}
          >
            {isForwarding ? (
              <>
                <Loader size={13} className="animate-spin" />
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
