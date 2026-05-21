import { MessageCircle, Zap, Shield, Users } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-8 sm:p-16 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950/80">
      <div className="max-w-md text-center space-y-8">
        {/* Animated Logo */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl shadow-blue-500/20 animate-pulse">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-[3px] border-slate-50 dark:border-slate-900 flex items-center justify-center">
              <Zap size={12} className="text-white" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Uranus</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
            Modern, private messaging with real-time features. Select a conversation from the sidebar to start chatting.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
          <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
            <Shield size={20} className="text-blue-500" />
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Private</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
            <Zap size={20} className="text-amber-500" />
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Fast</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
            <Users size={20} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Social</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
