import { useRef, useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Paperclip, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isViewOnce, setIsViewOnce] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const { sendMessage, selectedUser, editingMessageId, editMessage, replyingToMessage } = useChatStore();
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
        formData.append("viewOnce", isViewOnce);
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
    <div className="w-full px-4 sm:px-6 py-4 bg-base-100 dark:bg-zinc-900 border-t border-base-200/80 flex-shrink-0 select-none">
      <div className="max-w-[800px] w-full mx-auto">
        {(imagePreview || filePreview) && (
          <div className="mb-3 flex flex-col gap-2 animate-fadeIn">
            <div className="relative inline-block">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg border border-base-300"
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center bg-base-200 rounded-lg border border-base-300">
                  <Paperclip size={24} />
                  <span className="ml-1 text-[10px] truncate max-w-[60px]">{filePreview?.name}</span>
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
            <label className="inline-flex items-center gap-2 text-xs text-base-content/60">
              <input
                type="checkbox"
                checked={isViewOnce}
                onChange={(e) => setIsViewOnce(e.target.checked)}
                className="checkbox checkbox-xs rounded checkbox-primary"
              />
              View once media
            </label>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex items-center w-full bg-base-200/70 dark:bg-zinc-800/60 border border-base-200/50 dark:border-zinc-700/60 rounded-2xl pl-4 pr-2 py-2 gap-2 shadow-sm hover:border-base-200/80 dark:hover:border-zinc-700/80 transition-all">
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-sm text-base-content placeholder-base-content/40"
            placeholder={editingMessageId ? "Edit message..." : "Type a message..."}
            value={text}
            onChange={handleTextChange}
            disabled={isSending}
          />

          <div className="flex items-center gap-0.5">
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
              className={`btn btn-sm btn-ghost btn-circle ${imagePreview ? "text-emerald-500 animate-pulse" : "text-base-content/50 hover:bg-base-300/50"}`}
              onClick={() => imageInputRef.current?.click()}
              disabled={isSending}
              title="Attach photo"
            >
              <Image size={18} />
            </button>

            <button
              type="button"
              className={`btn btn-sm btn-ghost btn-circle ${filePreview ? "text-emerald-500 animate-pulse" : "text-base-content/50 hover:bg-base-300/50"}`}
              onClick={() => fileInputRef.current?.click()}
              disabled={isSending}
              title="Attach file"
            >
              <Paperclip size={18} />
            </button>

            <button
              type="submit"
              className="btn btn-sm btn-circle btn-primary flex items-center justify-center shadow-md shadow-primary/10 ml-1.5"
              disabled={(!text.trim() && !imagePreview && !filePreview) || isSending}
            >
              {isSending ? (
                <Loader size={14} className="animate-spin" />
              ) : (
                <Send size={14} />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
