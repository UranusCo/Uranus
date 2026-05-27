import { Video, PhoneCall, ArrowUpRight, ArrowDownLeft } from "lucide-react";

const CallsView = () => {
  const mockCalls = [
    { name: "Bagus Pambudi", time: "12 mins ago", type: "voice", direction: "incoming", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80" },
    { name: "Dajeng Septi", time: "1h ago", type: "video", direction: "outgoing", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80" },
    { name: "Larry Abraham", time: "Yesterday", type: "voice", direction: "missed", avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80" },
  ];

  return (
    <div className="h-full w-full bg-white dark:bg-slate-800 flex flex-col transition-all duration-200 border-r border-slate-200 dark:border-slate-700 select-none animate-fadeIn">
      {/* Top Header */}
      <div className="px-5 pt-6 pb-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-slate-850 dark:text-slate-100 tracking-tight">Calls</h1>
      </div>

      {/* List */}
      <div className="flex-grow overflow-y-auto px-5 space-y-3 pb-6">
        <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Recent Calls</p>
        
        {mockCalls.map((call, idx) => (
          <div key={idx} className="flex items-center justify-between p-3.5 bg-slate-50/60 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-850 rounded-2xl hover:scale-[1.01] transition-transform">
            <div className="flex items-center gap-3">
              <img src={call.avatar} className="size-11 rounded-full object-cover border border-slate-100 dark:border-slate-700" alt={call.name} />
              <div>
                <p className="text-sm font-bold text-slate-850 dark:text-slate-100">{call.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-400 dark:text-slate-550 font-bold">
                  {call.direction === "incoming" && <ArrowDownLeft size={13} className="text-emerald-500" />}
                  {call.direction === "outgoing" && <ArrowUpRight size={13} className="text-blue-500" />}
                  {call.direction === "missed" && <ArrowDownLeft size={13} className="text-rose-500" />}
                  <span>{call.time}</span>
                </div>
              </div>
            </div>
            <button className="size-9 bg-slate-100 dark:bg-slate-850 flex items-center justify-center rounded-xl text-slate-500 hover:text-blue-500 transition-colors">
              {call.type === "video" ? <Video size={15} /> : <PhoneCall size={15} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallsView;
