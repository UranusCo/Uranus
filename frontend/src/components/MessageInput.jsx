import { useRef, useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Paperclip, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useFriendStore } from "../store/useFriendStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isViewOnce, setIsViewOnce] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const { sendMessage, selectedUser, editingMessageId, editMessage, replyingToMessage } = useChatStore();
  const { socket, authUser } = useAuthStore();
  const { friends } = useFriendStore();

  const isSelf = selectedUser?._id === authUser?._id;
  const isFriend = friends.some((f) => f._id === selectedUser?._id);
  const canChat = isSelf || isFriend;
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

  if (selectedUser && !canChat) {
    return (
      <div className="w-full px-4 sm:px-6 py-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex-shrink-0 select-none text-center transition-colors duration-200">
        <div className="max-w-[800px] w-full mx-auto py-3 px-4 bg-slate-50 dark:bg-slate-900/20 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            You can only chat with users after becoming friends
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 py-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex-shrink-0 select-none transition-colors duration-200">
      <div className="max-w-[800px] w-full mx-auto">
        {(imagePreview || filePreview) && (
          <div className="mb-3 flex flex-col gap-2 animate-fadeIn">
            <div className="relative inline-block">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg border border-slate-200 dark:border-slate-700"
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center bg-slate-100 dark:bg-slate-900/60 rounded-lg border border-slate-200 dark:border-slate-700">
                  <Paperclip size={24} className="text-slate-400 dark:text-slate-500" />
                  <span className="ml-1 text-[10px] truncate max-w-[60px] text-slate-500 dark:text-slate-400">{filePreview?.name}</span>
                </div>
              )}
              <button
                onClick={removeAttachment}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors"
                type="button"
              >
                <X className="size-3" />
              </button>
            </div>
            <label className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={isViewOnce}
                onChange={(e) => setIsViewOnce(e.target.checked)}
                className="w-3.5 h-3.5 text-blue-500 border-slate-350 dark:border-slate-600 rounded bg-transparent focus:ring-blue-500 focus:ring-1 cursor-pointer"
              />
              View once media
            </label>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex items-center w-full bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 rounded-2xl pl-4 pr-2 py-2 gap-2 shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-205">
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
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
              className={`size-8 flex items-center justify-center rounded-full transition-colors ${imagePreview ? "text-emerald-500 animate-pulse" : "text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
              onClick={() => imageInputRef.current?.click()}
              disabled={isSending}
              title="Attach photo"
            >
              <Image size={17} />
            </button>

            <button
              type="button"
              className={`size-8 flex items-center justify-center rounded-full transition-colors ${filePreview ? "text-emerald-500 animate-pulse" : "text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"}`}
              onClick={() => fileInputRef.current?.click()}
              disabled={isSending}
              title="Attach file"
            >
              <Paperclip size={17} />
            </button>

            <button
              type="submit"
              className="size-8 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white ml-1.5 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
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
