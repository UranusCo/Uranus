import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Search, X } from "lucide-react";

const MessageSearch = ({ userId, onClose }) => {
  const [query, setQuery] = useState("");
  const [sender, setSender] = useState("all");
  const { searchMessages, searchMessageResults } = useChatStore();

  useEffect(() => {
    if (query.trim().length > 0) {
      searchMessages(userId, query, sender === "all" ? null : sender);
    }
  }, [query, sender, userId, searchMessages]);

  return (
    <div className="bg-base-100 border-b border-base-300 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Search Messages</h3>
        <button onClick={onClose} className="btn btn-sm btn-ghost">
          <X size={18} />
        </button>
      </div>

      <div className="space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-3 size-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 input input-bordered input-sm"
            autoFocus
          />
        </div>

        {/* Filter */}
        <select
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          className="w-full select select-bordered select-sm"
        >
          <option value="all">All messages</option>
          <option value="me">My messages</option>
          <option value="them">Their messages</option>
        </select>
      </div>

      {/* Results */}
      <div className="max-h-64 overflow-y-auto space-y-2">
        {searchMessageResults.length > 0 ? (
          searchMessageResults.map((msg) => (
            <div
              key={msg._id}
              className="p-2 bg-base-200 rounded-lg text-sm truncate hover:bg-base-300 cursor-pointer"
              title={msg.text}
            >
              <p className="text-xs text-zinc-400 mb-1">
                {new Date(msg.createdAt).toLocaleDateString()}
              </p>
              <p className="truncate">{msg.text}</p>
            </div>
          ))
        ) : query.trim().length > 0 ? (
          <p className="text-center text-zinc-500 py-4">No messages found</p>
        ) : (
          <p className="text-center text-zinc-500 py-4">Type to search...</p>
        )}
      </div>
    </div>
  );
};

export default MessageSearch;
