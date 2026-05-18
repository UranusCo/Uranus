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
    <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 space-y-4 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800 dark:text-slate-100">Search Messages</h3>
        <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="space-y-3">
        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3 top-3.5 size-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search messages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-250 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm"
            autoFocus
          />
        </div>

        {/* Filter */}
        <select
          value={sender}
          onChange={(e) => setSender(e.target.value)}
          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-250 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200 cursor-pointer"
        >
          <option value="all" className="bg-white dark:bg-slate-800">All messages</option>
          <option value="me" className="bg-white dark:bg-slate-800">My messages</option>
          <option value="them" className="bg-white dark:bg-slate-800">Their messages</option>
        </select>
      </div>

      {/* Results */}
      <div className="max-h-64 overflow-y-auto space-y-2">
        {searchMessageResults.length > 0 ? (
          searchMessageResults.map((msg) => (
            <div
              key={msg._id}
              className="p-2.5 bg-slate-50 dark:bg-slate-900/40 rounded-xl text-sm truncate hover:bg-slate-100 dark:hover:bg-slate-700/60 cursor-pointer transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700/20"
              title={msg.text}
            >
              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 mb-1">
                {new Date(msg.createdAt).toLocaleDateString()}
              </p>
              <p className="truncate text-slate-700 dark:text-slate-200 font-medium">{msg.text}</p>
            </div>
          ))
        ) : query.trim().length > 0 ? (
          <p className="text-center text-slate-400 dark:text-slate-500 py-4 text-xs font-semibold">No messages found</p>
        ) : (
          <p className="text-center text-slate-400 dark:text-slate-500 py-4 text-xs font-semibold">Type to search...</p>
        )}
      </div>
    </div>
  );
};

export default MessageSearch;
