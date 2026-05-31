import { useState, useEffect } from "react";
import { Download, FileText, FileJson, FileSpreadsheet, Loader } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

const ExportChatModal = ({ user, onClose }) => {
  const [format, setFormat] = useState('json');
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { exportChat } = useChatStore();

  const formatOptions = [
    {
      value: 'json',
      label: 'JSON',
      description: 'Complete data with all metadata',
      icon: <FileJson className="w-5 h-5" />,
    },
    {
      value: 'text',
      label: 'Text',
      description: 'Human-readable text format',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      value: 'csv',
      label: 'CSV',
      description: 'Spreadsheet-compatible format',
      icon: <FileSpreadsheet className="w-5 h-5" />,
    },
  ];

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const success = await exportChat(user._id, format, includeDeleted);
      if (success) {
        toast.success(`Chat exported as ${format.toUpperCase()}`);
        onClose();
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    const handleClose = () => onClose();
    const handleSubmit = () => handleExport();
    window.addEventListener("close-active-modal", handleClose);
    window.addEventListener("submit-active-modal", handleSubmit);
    return () => {
      window.removeEventListener("close-active-modal", handleClose);
      window.removeEventListener("submit-active-modal", handleSubmit);
    };
  }, [onClose, handleExport]);

  return (
    <div data-context="modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl max-w-md w-full animate-fadeIn overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Export Chat
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold mt-1">
              Export conversation with {user.fullName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-500 dark:hover:text-slate-200 transition-colors"
            disabled={isExporting}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Export Format
            </label>
            <div className="space-y-2">
              {formatOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                    format === option.value
                      ? 'border-blue-500 bg-blue-500/5 dark:border-blue-400 dark:bg-blue-400/5'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value={option.value}
                    checked={format === option.value}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-4 h-4 text-blue-500 border-slate-350 dark:border-slate-600 focus:ring-blue-500 focus:ring-1 cursor-pointer mr-3"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`text-blue-500 dark:text-blue-400 ${format === option.value ? '' : 'opacity-60'}`}>
                      {option.icon}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-800 dark:text-slate-100">
                        {option.label}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {option.description}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeDeleted}
                onChange={(e) => setIncludeDeleted(e.target.checked)}
                className="w-4 h-4 text-blue-500 border-slate-350 dark:border-slate-600 rounded bg-transparent focus:ring-blue-500 focus:ring-1 cursor-pointer"
              />
              <div>
                <div className="font-bold text-sm text-slate-800 dark:text-slate-100">
                  Include deleted messages
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Include messages that have been deleted
                </div>
              </div>
            </label>
          </div>

          {/* Export Info */}
          <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
            <h4 className="font-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">What gets exported:</h4>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 font-semibold">
              <li>• Message text and timestamps</li>
              <li>• Images and file attachments</li>
              <li>• Reactions and replies</li>
              <li>• Edit history and pinned messages</li>
              <li>• Forwarded message information</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end p-6 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-semibold text-xs transition-all active:scale-[0.98]"
            disabled={isExporting}
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-xl font-semibold text-xs transition-all active:scale-[0.98] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Loader className="w-3.5 h-3.5 mr-1 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 mr-1" />
                Export Chat
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportChatModal;