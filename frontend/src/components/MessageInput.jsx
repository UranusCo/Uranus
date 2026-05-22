import { useRef, useState, useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Paperclip, Loader, Mic, Square, Smile, Plus, MoreHorizontal, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useFriendStore } from "../store/useFriendStore";
import { Button, IconButton } from "./ui";
import EmojiPicker from "./EmojiPicker";
import { EMOJIS, HELP_CENTER_EMAIL } from "../constants";

const MessageInput = () => {
  const [text, setText] = useState("");
  const sendOnEnter = useChatStore(state => state.chatSettings?.sendOnEnter ?? true);
  const setChatSetting = useChatStore(state => state.setChatSetting);
  const [imagePreview, setImagePreview] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [isViewOnce, setIsViewOnce] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiSuggestions, setEmojiSuggestions] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recordingIntervalRef = useRef(null);
  const inputRef = useRef(null);
  
  const { sendMessage, selectedUser, editingMessageId, editMessage, replyingToMessage, drafts, setDraft } = useChatStore();
  const { socket, authUser } = useAuthStore();
  const { friends, requests, sentRequests } = useFriendStore();

  useEffect(() => {
    if (selectedUser) {
      const draft = drafts[selectedUser._id] || "";
      setText(draft);
      adjustTextareaHeight();
    }
  }, [selectedUser, drafts]);

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      const newHeight = Math.min(inputRef.current.scrollHeight, 120);
      inputRef.current.style.height = `${newHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  const isSelf = selectedUser?._id === authUser?._id;
  const isFriend = friends.some((f) => String(f._id) === String(selectedUser?._id));
  const hasIncoming = requests.some((r) => r.requesterId && String(r.requesterId._id) === String(selectedUser?._id));
  const hasOutgoing = sentRequests.some((r) => r.receiverId && String(r.receiverId._id) === String(selectedUser?._id));
  
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
    if (e) e.preventDefault();
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
        formData.append("viewOnce", isViewOnce);
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

  const hasContent = text.trim() || imagePreview || filePreview;

  if (selectedUser && !canChat) {
    return (
      <div className="w-full px-4 sm:px-6 py-4 bg-surface dark:bg-surface-dark border-t border-border dark:border-border-dark flex-shrink-0 select-none text-center transition-colors duration-200">
        <div className="max-w-[800px] w-full mx-auto py-3 px-4 bg-slate-100 dark:bg-slate-900/50 border border-dashed border-border dark:border-border-dark rounded-2xl">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            {hasIncoming ? "Accept their friend request to start chatting!" : 
             hasOutgoing ? "Waiting for them to accept your friend request..." : 
             "You can only chat with users after becoming friends"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-2 sm:px-6 py-2 sm:py-3 bg-surface dark:bg-surface-dark border-t border-border dark:border-border-dark flex-shrink-0 select-none transition-all duration-200 relative">
      <div className="max-w-[850px] w-full mx-auto relative">
        
        {emojiSuggestions.length > 0 && (
          <div className="absolute bottom-full mb-3 left-0 z-50 bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-soft flex flex-col overflow-hidden animate-fadeIn w-48">
            {emojiSuggestions.map((emoji) => (
              <button
                key={emoji.name}
                onClick={() => selectEmoji(emoji.char)}
                className="px-3 py-2 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm transition-colors"
              >
                <span>{emoji.char}</span>
                <span className="text-slate-400 dark:text-slate-500 text-xs">:{emoji.name}:</span>
              </button>
            ))}
          </div>
        )}

        {(imagePreview || filePreview) && (
          <div className="mb-3 flex flex-col gap-2 animate-fadeIn">
            <div className="relative inline-block">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-xl border border-border dark:border-border-dark shadow-soft" />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-xl border border-border dark:border-border-dark">
                  <Paperclip size={24} className="text-slate-400 dark:text-slate-500" />
                  <span className="ml-1 text-[10px] truncate max-w-[60px] text-slate-500 dark:text-slate-400">{filePreview?.name}</span>
                </div>
              )}
              <button onClick={removeAttachment} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors shadow-sm" type="button">
                <X className="size-3.5" />
              </button>
            </div>
            <label className="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-bold cursor-pointer select-none">
              <input type="checkbox" checked={isViewOnce} onChange={(e) => setIsViewOnce(e.target.checked)} className="w-4 h-4 text-primary border-border dark:border-border-dark rounded bg-transparent focus:ring-primary focus:ring-1 cursor-pointer transition-all" />
              View once media
            </label>
          </div>
        )}

        <div className="flex items-end w-full gap-1 sm:gap-2">
          {/* Action Buttons Group */}
          <div className={`flex items-center gap-0.5 transition-all duration-300 ${text.length > 0 ? 'w-10 overflow-hidden' : 'w-auto'}`}>
            {text.length > 0 ? (
              <IconButton 
                size="lg" 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-primary"
              >
                <Plus className={`transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`} />
              </IconButton>
            ) : (
              <div className="flex items-center gap-0.5 animate-fadeIn">
                <IconButton 
                  size="md" 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="sm:hidden"
                >
                  <Plus />
                </IconButton>
                <div className="hidden sm:flex items-center gap-0.5">
                  <IconButton onClick={() => imageInputRef.current?.click()} title="Photos"><Image /></IconButton>
                  <IconButton onClick={() => fileInputRef.current?.click()} title="Files"><Paperclip /></IconButton>
                  <IconButton 
                    onClick={() => setChatSetting('sendOnEnter', !sendOnEnter)}
                    variant={sendOnEnter ? 'active' : 'ghost'}
                    title="Settings"
                  ><Square size={16} /></IconButton>
                </div>
              </div>
            )}
            
            <input type="file" accept="image/*" className="hidden" ref={imageInputRef} onChange={handleImageChange} disabled={isSending} />
            <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} disabled={isSending} />
          </div>

          {/* Expanded Actions */}
          {isExpanded && text.length > 0 && (
            <div className="flex items-center gap-1 animate-fadeIn">
              <IconButton size="md" onClick={() => imageInputRef.current?.click()}><Image /></IconButton>
              <IconButton size="md" onClick={() => fileInputRef.current?.click()}><Paperclip /></IconButton>
            </div>
          )}

          {/* Input Area */}
          <div className="flex-1 flex items-end bg-slate-100 dark:bg-slate-800/50 rounded-[24px] px-3 py-1.5 transition-all duration-200 focus-within:bg-slate-200/50 dark:focus-within:bg-slate-800 border border-transparent focus-within:border-primary/20">
            {isRecording ? (
              <div className="flex-1 flex items-center gap-3 px-2 py-1.5 text-rose-500 font-bold animate-pulse">
                <div className="size-2.5 rounded-full bg-rose-500" />
                <span className="text-sm">Recording {formatTime(recordingTime)}</span>
              </div>
            ) : (
              <textarea
                ref={inputRef}
                rows={1}
                className="flex-1 max-h-[120px] resize-none bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-[15px] text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 leading-6 py-1 pr-2"
                placeholder={editingMessageId ? "Edit message..." : "Type a message..."}
                value={text}
                onChange={handleTextChange}
                onKeyDown={(e) => {
                  if (isSending) return;
                  if (sendOnEnter) {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }
                }}
                disabled={isSending}
              />
            )}
            
            <div className="flex items-center self-end mb-0.5">
              <IconButton
                size="sm"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                variant={showEmojiPicker ? 'active' : 'ghost'}
                disabled={isSending || isRecording}
              >
                <Smile />
              </IconButton>
              {showEmojiPicker && <EmojiPicker onSelect={(emoji) => {
                const newText = text + emoji;
                setText(newText);
                if (selectedUser) setDraft(selectedUser._id, newText);
              }} onClose={() => setShowEmojiPicker(false)} />}
            </div>
          </div>

          {/* Send / Mic Button */}
          <div className="flex items-center">
            {hasContent || isRecording ? (
              <IconButton
                variant="active"
                size="lg"
                onClick={handleSendMessage}
                disabled={isSending}
                className="bg-primary hover:bg-primary-dark text-white"
              >
                {isSending ? <Loader className="animate-spin" /> : <Send />}
              </IconButton>
            ) : (
              <IconButton
                size="lg"
                onClick={isRecording ? stopRecording : startRecording}
                className="text-primary"
              >
                <Mic />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
