const StatusView = ({ onAddStatusClick }) => {
  const mockStories = [
    { name: "Bayu Aji", time: "Just now", text: "Working on new designs...", color: "from-purple-500 to-indigo-500" },
    { name: "Dajeng Septi", time: "45 mins ago", text: "Sunny day! ☀️", color: "from-amber-400 to-orange-500" },
    { name: "Larry Abraham", time: "2h ago", text: "Coding all night.", color: "from-blue-500 to-teal-400" },
  ];

  return (
    <div className="h-full w-full bg-white dark:bg-slate-800 flex flex-col transition-all duration-200 border-r border-slate-200 dark:border-slate-700 select-none animate-fadeIn">
      {/* Top Header */}
      <div className="px-5 pt-6 pb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-slate-850 dark:text-slate-100 tracking-tight">Status</h1>
      </div>

      {/* Content */}
      <div className="flex-grow overflow-y-auto px-5 space-y-3 pb-6">
        {/* Self Status Card */}
        <div 
          onClick={onAddStatusClick}
          className="flex items-center justify-between p-3.5 bg-slate-50/60 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-850 rounded-2xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-850/40 transition-colors shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="relative size-11 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs select-none">
              You
            </div>
            <div>
              <p className="text-sm font-bold text-slate-850 dark:text-slate-105">My Status</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-bold mt-0.5">Tap to add status update</p>
            </div>
          </div>
          <button className="size-8 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-md font-extrabold text-sm">
            +
          </button>
        </div>

        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pt-2.5 mb-2">Recent Updates</p>
        
        {mockStories.map((story, idx) => (
          <div key={idx} className="flex items-center gap-3.5 p-3.5 bg-slate-50/60 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-850 rounded-2xl hover:scale-[1.01] transition-transform">
            <div className={`size-11 rounded-full bg-gradient-to-br ${story.color} flex items-center justify-center p-0.5 shadow-sm`}>
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                <span className="font-extrabold text-xs text-slate-700 dark:text-slate-350">{story.name.charAt(0)}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-855 dark:text-slate-100">{story.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-semibold italic">&quot;{story.text}&quot;</p>
              <p className="text-[9px] text-slate-400 dark:text-slate-500 font-extrabold mt-1.5 uppercase tracking-wider">{story.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusView;
