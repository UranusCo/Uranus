import { MessageSquare, Zap } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-white dark:bg-background-dark">
      <div className="max-w-md text-center flex flex-col items-center">
        {/* Animated Icon Display */}
        <div className="relative mb-8">
          <div className="size-24 rounded-[32px] bg-gradient-to-br from-[#00D4FF]/10 to-[#0080FF]/10 flex items-center justify-center animate-pulse">
            <Zap className="size-12 text-primary fill-primary/20" />
          </div>
          <div className="absolute -bottom-2 -right-2 size-10 rounded-2xl bg-white dark:bg-slate-900 shadow-premium flex items-center justify-center">
            <MessageSquare className="size-5 text-primary" />
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-[28px] font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
          Welcome to Blink
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-[16px] leading-relaxed max-w-[280px]">
          Select a conversation from the sidebar to start messaging your friends
        </p>
        
        <div className="mt-8 flex gap-2">
          <div className="px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-900 text-[13px] font-medium text-slate-400">
            Securely encrypted
          </div>
          <div className="px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-900 text-[13px] font-medium text-slate-400">
            Fast delivery
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;

