import { useRef, useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Paperclip, Loader, Mic, Square, Smile } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useFriendStore } from "../store/useFriendStore";
import EmojiPicker from "./EmojiPicker";
import { EMOJIS } from "../constants";
import { HELP_CENTER_EMAIL } from "../constants";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiSuggestions, setEmojiSuggestions] = useState([]);
  
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingIntervalRef = useRef(null);
  const inputRef = useRef(null);
  
  const { sendMessage, selectedUser, editingMessageId, editMessage, replyingToMessage, drafts, setDraft } = useChatStore();
  const { socket, authUser } = useAuthStore();
  const { friends } = useFriendStore();

  useEffect(() => {
    if (selectedUser) {
      const draft = drafts[selectedUser._id] || "";
      setText(draft);
    }
  }, [selectedUser, drafts, setDraft]);

  const isSelf = selectedUser?._id === authUser?._id;
  const isFriend = friends.some((f) => f._id === selectedUser?._id);
  const isHelpCenter = selectedUser?.email === HELP_CENTER_EMAIL || authUser?.email === HELP_CENTER_EMAIL;
  const canChat = isSelf || isFriend || isHelpCenter;
  const typingTimeoutRef = useRef(null);
  const sendingDelayRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const audioFile = new File([audioBlob], `voice_${Date.now()}.webm`, { type: "audio/webm" });
        setFilePreview(audioFile);
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      recordingIntervalRef.current = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Microphone access denied");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(recordingIntervalRef.current);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) { toast.error("Please select an image file"); return; }
    if (file.size > 50 * 1024 * 1024) { toast.error("File size must be less than 50MB"); return; }
    const reader = new FileReader();
    reader.onloadend = () => { setImagePreview(reader.result); setFilePreview(null); };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 50 * 1024 * 1024) { toast.error("File size must be less than 50MB"); return; }
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
    const newText = e.target.value;
    setText(newText);
    
    // Shortcode logic
    const lastWord = newText.split(" ").pop();
    if (lastWord.startsWith(":") && lastWord.length > 1) {
      const query = lastWord.substring(1).toLowerCase();
      const matches = EMOJIS.filter(e => e.name.includes(query));
      setEmojiSuggestions(matches.slice(0, 5));
    } else {
      setEmojiSuggestions([]);
    }

    if (selectedUser) {
      setDraft(selectedUser._id, newText);
      socket.emit("typing", selectedUser._id);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => socket.emit("stopTyping", selectedUser._id), 2000);
    }
  };

  const selectEmoji = (emojiChar) => {
    const words = text.split(" ");
    words.pop();
    const newText = [...words, emojiChar].join(" ") + " ";
    setText(newText);
    setEmojiSuggestions([]);
    if (selectedUser) setDraft(selectedUser._id, newText);
    inputRef.current?.focus();
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview && !filePreview && !isRecording) return;
    if (isSending) return;
    if (isRecording) { stopRecording(); return; }
    if (selectedUser) socket.emit("stopTyping", selectedUser._id);

    try {
      setIsSending(true);
      await new Promise((resolve) => { sendingDelayRef.current = setTimeout(resolve, 300); });
      const formData = new FormData();
      if (text.trim()) formData.append("text", text.trim());
      if (imagePreview) formData.append("image", imagePreview);
      if (filePreview) formData.append("file", filePreview);
      if (replyingToMessage) formData.append("replyTo", replyingToMessage._id);

      if (editingMessageId) {
        await editMessage(editingMessageId, text.trim());
      } else {
        formData.append("viewOnce", false);
        await sendMessage(formData);
      }

      setText("");
      if (selectedUser) setDraft(selectedUser._id, "");
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
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    };
  }, []);

  if (selectedUser && !canChat) {
    return (
      <div className="w-full px-4 sm:px-6 py-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex-shrink-0 select-none text-center transition-colors duration-200">
        <div className="max-w-[800px] w-full mx-auto py-2.5 px-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-700/30 rounded-2xl">
          <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">Add as friend to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:px-4 py-2 sm:py-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 flex-shrink-0 select-none transition-colors duration-200 relative">
      <div className="max-w-[850px] w-full mx-auto relative">
        
        {/* Shortcode Suggestions */}
        {emojiSuggestions.length > 0 && (
          <div className="absolute bottom-full mb-2 left-2 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl flex flex-col overflow-hidden animate-fadeIn w-48">
            {emojiSuggestions.map((emoji) => (
              <button
                key={emoji.name}
                onClick={() => selectEmoji(emoji.char)}
                className="px-3 py-2 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700 text-sm transition-colors"
              >
                <span>{emoji.char}</span>
                <span className="text-slate-400 dark:text-slate-500 text-xs">:{emoji.name}:</span>
              </button>
            ))}
          </div>
        )}

        {(imagePreview || filePreview) && (
          <div className="mb-2 flex gap-2 animate-fadeIn px-1">
            <div className="relative">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm" />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center bg-slate-100 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700">
                  <Paperclip size={20} className="text-slate-400 dark:text-slate-500" />
                  <span className="ml-1 text-[9px] truncate max-w-[40px] text-slate-500 dark:text-slate-400">{filePreview?.name}</span>
                </div>
              )}
              <button onClick={removeAttachment} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 text-white flex items-center justify-center transition-colors shadow-sm" type="button">
                <X className="size-3" />
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex items-center gap-2 pl-3 pr-1.5 py-1.5 bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 rounded-full shadow-sm focus-within:border-blue-400/60 dark:focus-within:border-blue-500/60 focus-within:shadow-md focus-within:shadow-blue-500/5 transition-all duration-200">
          {isRecording ? (
            <div className="flex items-center gap-2 px-1 text-rose-500 font-bold animate-pulse">
              <div className="size-2 rounded-full bg-rose-500" />
              <span className="text-sm">{formatTime(recordingTime)}</span>
            </div>
          ) : (
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-[14px] text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 py-1"
              placeholder={editingMessageId ? "Edit message..." : "Message..."}
              value={text}
              onChange={handleTextChange}
              disabled={isSending}
            />
          )}

          <div className="flex items-center gap-0.5">
            <input type="file" accept="image/*" className="hidden" ref={imageInputRef} onChange={handleImageChange} disabled={isSending} />
            <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} disabled={isSending} />

            <div className="relative">
              <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className={`size-8 flex items-center justify-center rounded-full transition-all ${showEmojiPicker ? "text-blue-500 bg-blue-500/10" : "text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"}`} disabled={isSending || isRecording}>
                <Smile size={18} />
              </button>
              {showEmojiPicker && <EmojiPicker onSelect={(emoji) => {
                const newText = text + emoji;
                setText(newText);
                if (selectedUser) setDraft(selectedUser._id, newText);
              }} onClose={() => setShowEmojiPicker(false)} />}
            </div>

            {!text.trim() && (
              <>
                <button type="button" className={`size-8 flex items-center justify-center rounded-full transition-all ${imagePreview ? "text-blue-500" : "text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"}`} onClick={() => imageInputRef.current?.click()} disabled={isSending || isRecording} title="Attach photo">
                  <Image size={18} />
                </button>
                <button type="button" className={`size-8 flex items-center justify-center rounded-full transition-all ${filePreview ? "text-blue-500" : "text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"}`} onClick={() => fileInputRef.current?.click()} disabled={isSending || isRecording} title="Attach file">
                  <Paperclip size={18} />
                </button>
                <button type="button" className={`size-8 flex items-center justify-center rounded-full transition-all ${isRecording ? "text-rose-500" : "text-slate-400 hover:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"}`} onClick={isRecording ? stopRecording : startRecording} disabled={isSending || (text.trim() && !isRecording)} title={isRecording ? "Stop recording" : "Record voice message"}>
                  {isRecording ? <Square size={15} fill="currentColor" /> : <Mic size={18} />}
                </button>
              </>
            )}

            <button type="submit" className={`size-9 flex items-center justify-center rounded-full transition-all duration-200 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm ml-0.5 ${text.trim() || imagePreview || filePreview ? "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-blue-500/20" : "text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"}`} disabled={(!text.trim() && !imagePreview && !filePreview && !isRecording) || isSending}>
              {isSending ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
