import { useRef, useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Paperclip, Loader, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const { sendMessage, selectedUser, editingMessageId, setEditingMessage, editMessage, replyingToMessage } = useChatStore();
  const { socket } = useAuthStore();
  const typingTimeoutRef = useRef(null);
  const sendingDelayRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size must be less than 50MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFilePreview(null);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File size must be less than 50MB");
      return;
    }
    setFilePreview(file);
    setImagePreview(null);
  };

  const removeAttachment = () => {
    setImagePreview(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    if (selectedUser) {
      socket.emit("typing", selectedUser._id);

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit("stopTyping", selectedUser._id);
      }, 2000);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview && !filePreview) return;
    if (isSending) return;

    if (selectedUser) socket.emit("stopTyping", selectedUser._id);

    try {
      setIsSending(true);

      await new Promise((resolve) => {
        sendingDelayRef.current = setTimeout(resolve, 300);
      });

      const formData = new FormData();
      if (text.trim()) formData.append("text", text.trim());
      if (imagePreview) formData.append("image", imagePreview);
      if (filePreview) formData.append("file", filePreview);
      if (replyingToMessage) formData.append("replyTo", replyingToMessage._id);

      if (editingMessageId) {
        // Edit existing message
        await editMessage(editingMessageId, text.trim());
      } else {
        // Send new message
        await sendMessage(formData);
      }

      // Clear form
      setText("");
      setImagePreview(null);
      setFilePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (imageInputRef.current) imageInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (sendingDelayRef.current) clearTimeout(sendingDelayRef.current);
    };
  }, []);

  return (
    <div className="px-4 pt-4 pb-safe w-full border-t border-base-300">
      {(imagePreview || filePreview) && (
        <div className="mb-3 flex items-center gap-2 animate-fadeIn">
          <div className="relative">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
              />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center bg-base-200 rounded-lg border border-zinc-700">
                <Paperclip size={24} />
                <span className="ml-1 text-sm">{filePreview?.name}</span>
              </div>
            )}
            <button
              onClick={removeAttachment}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center hover:bg-base-400 transition-colors"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        {/* Mobile attachment button */}
        <div className="relative sm:hidden">
          <button
            type="button"
            className={`btn btn-circle btn-sm ${isSending ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => setShowAttachMenu(!showAttachMenu)}
            disabled={isSending}
            aria-label="Attach"
          >
            <Plus size={18} />
          </button>
          {showAttachMenu && (
            <div className="absolute bottom-full left-0 mb-2 bg-base-100 rounded-xl shadow-lg border border-base-300 p-3 flex gap-3 z-50">
              <button
                type="button"
                className="flex flex-col items-center gap-1 p-3 hover:bg-base-200 rounded-lg active:bg-base-300 transition-colors"
                onClick={() => { imageInputRef.current?.click(); setShowAttachMenu(false); }}
              >
                <Image size={22} />
                <span className="text-xs">Photo</span>
              </button>
              <button
                type="button"
                className="flex flex-col items-center gap-1 p-3 hover:bg-base-200 rounded-lg active:bg-base-300 transition-colors"
                onClick={() => { fileInputRef.current?.click(); setShowAttachMenu(false); }}
              >
                <Paperclip size={22} />
                <span className="text-xs">File</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md text-[16px] sm:text-sm disabled:opacity-50"
            placeholder={editingMessageId ? "Edit message..." : "Type a message..."}
            value={text}
            onChange={handleTextChange}
            disabled={isSending}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={imageInputRef}
            onChange={handleImageChange}
            disabled={isSending}
          />
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={isSending}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"} 
                     ${isSending ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => imageInputRef.current?.click()}
            disabled={isSending}
          >
            <Image size={20} />
          </button>
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${filePreview ? "text-emerald-500" : "text-zinc-400"}
                     ${isSending ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => fileInputRef.current?.click()}
            disabled={isSending}
          >
            <Paperclip size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle disabled:opacity-50"
          disabled={(!text.trim() && !imagePreview && !filePreview) || isSending}
        >
          {isSending ? (
            <Loader size={22} className="animate-spin" />
          ) : (
            <Send size={22} />
          )}
        </button>
      </form>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MessageInput;
