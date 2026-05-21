const EMOJIS = [
  { char: "😀", name: "smile" }, { char: "😂", name: "joy" }, { char: "😍", name: "heart_eyes" },
  { char: "👍", name: "thumbsup" }, { char: "🙌", name: "raised_hands" }, { char: "🔥", name: "fire" },
  { char: "❤️", name: "heart" }, { char: "✨", name: "sparkles" }, { char: "🎉", name: "tada" },
  { char: "😎", name: "sunglasses" }, { char: "🤔", name: "thinking" }, { char: "😢", name: "cry" },
  { char: "😮", name: "open_mouth" }, { char: "👏", name: "clap" }, { char: "🚀", name: "rocket" },
  { char: "💯", name: "100" }, { char: "🙏", name: "pray" }, { char: "✅", name: "check" },
];

const EmojiPicker = ({ onSelect, onClose }) => {
  return (
    <div className="absolute bottom-full mb-3 right-0 sm:right-auto sm:left-0 z-[60] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl p-3 w-64 animate-fadeIn">
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Quick Emojis</span>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <span className="text-lg">×</span>
        </button>
      </div>
      <div className="grid grid-cols-6 gap-1">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji.name}
            onClick={() => { onSelect(emoji.char); onClose(); }}
            className="size-9 flex items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-xl active:scale-90"
            title={emoji.name}
          >
            {emoji.char}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
export { EMOJIS };
