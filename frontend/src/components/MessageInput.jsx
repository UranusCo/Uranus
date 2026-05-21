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
  const isHelpCenter = selectedUser?.email === "pansiluco@gmail.com" || authUser?.email === "pansiluco@gmail.com";
  const canChat = isSelf || isFriend || isHelpCenter;
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
    <div className="w-full px-3 sm:px-6 py-3 sm:py-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex-shrink-0 select-none transition-colors duration-200">
      <div className="max-w-[850px] w-full mx-auto">
        {(imagePreview || filePreview) && (
          <div className="mb-3 flex flex-col gap-2 animate-fadeIn">
            <div className="relative inline-block">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center bg-slate-100 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <Paperclip size={24} className="text-slate-400 dark:text-slate-500" />
                  <span className="ml-1 text-[10px] truncate max-w-[60px] text-slate-500 dark:text-slate-400">{filePreview?.name}</span>
                </div>
              )}
              <button
                onClick={removeAttachment}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors shadow-sm"
                type="button"
              >
                <X className="size-3.5" />
              </button>
            </div>
            <label className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-bold cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isViewOnce}
                onChange={(e) => setIsViewOnce(e.target.checked)}
                className="w-4 h-4 text-blue-500 border-slate-300 dark:border-slate-600 rounded bg-transparent focus:ring-blue-500 focus:ring-1 cursor-pointer transition-all"
              />
              View once media
            </label>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex items-center w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/80 rounded-2xl pl-4 pr-1.5 py-1.5 gap-2 shadow-sm focus-within:border-blue-500/50 dark:focus-within:border-blue-400/50 transition-all duration-200">
          <input
            type="text"
            className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-[14px] text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
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
              className={`size-9 flex items-center justify-center rounded-xl transition-all ${imagePreview ? "text-emerald-500 bg-emerald-500/10" : "text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"}`}
              onClick={() => imageInputRef.current?.click()}
              disabled={isSending}
              title="Attach photo"
            >
              <Image size={19} />
            </button>

            <button
              type="button"
              className={`size-9 flex items-center justify-center rounded-xl transition-all ${filePreview ? "text-emerald-500 bg-emerald-500/10" : "text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800"}`}
              onClick={() => fileInputRef.current?.click()}
              disabled={isSending}
              title="Attach file"
            >
              <Paperclip size={19} />
            </button>

            <button
              type="submit"
              className="size-9 flex items-center justify-center rounded-xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white ml-1 transition-all duration-200 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/20"
              disabled={(!text.trim() && !imagePreview && !filePreview) || isSending}
            >
              {isSending ? (
                <Loader size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
