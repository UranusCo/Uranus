import { useState } from "react";
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-base-100 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-base-300">
          <div>
            <h3 className="text-lg font-semibold text-base-content">
              Export Chat
            </h3>
            <p className="text-sm text-base-content/70 mt-1">
              Export conversation with {user.fullName}
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle"
            disabled={isExporting}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Format Selection */}
          <div>
            <label className="block text-sm font-medium text-base-content mb-3">
              Export Format
            </label>
            <div className="space-y-2">
              {formatOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                    format === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-base-300 hover:border-base-content/20'
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value={option.value}
                    checked={format === option.value}
                    onChange={(e) => setFormat(e.target.value)}
                    className="radio radio-primary mr-3"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`text-primary ${format === option.value ? '' : 'opacity-60'}`}>
                      {option.icon}
                    </div>
                    <div>
                      <div className="font-medium text-base-content">
                        {option.label}
                      </div>
                      <div className="text-sm text-base-content/70">
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
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeDeleted}
                onChange={(e) => setIncludeDeleted(e.target.checked)}
                className="checkbox checkbox-primary"
              />
              <div>
                <div className="font-medium text-base-content">
                  Include deleted messages
                </div>
                <div className="text-sm text-base-content/70">
                  Include messages that have been deleted
                </div>
              </div>
            </label>
          </div>

          {/* Export Info */}
          <div className="bg-base-200 rounded-lg p-4">
            <h4 className="font-medium text-base-content mb-2">What gets exported:</h4>
            <ul className="text-sm text-base-content/70 space-y-1">
              <li>• Message text and timestamps</li>
              <li>• Images and file attachments</li>
              <li>• Reactions and replies</li>
              <li>• Edit history and pinned messages</li>
              <li>• Forwarded message information</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end p-6 border-t border-base-300">
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            disabled={isExporting}
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="btn btn-primary btn-sm"
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
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