import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNotificationStore } from "../store/useNotificationStore";
import { Send, MessageSquare, Users, AtSign, Shield, Sun, Moon, Laptop } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme, wallpaper, setWallpaper } = useThemeStore();
  const { authUser } = useAuthStore();
  const { updatePreferences } = useNotificationStore();

  const handlePreferenceChange = (key, value) => {
    const currentPrefs = authUser?.notificationPreferences || {
      directMessage: true,
      groupMessage: true,
      mention: true,
      friendRequest: true,
      system: true,
    };
    updatePreferences({ ...currentPrefs, [key]: value });
  };

  return (
    <div className="h-screen bg-slate-50 dark:bg-slate-900 pt-20 transition-colors duration-200 overflow-y-auto pb-20">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        
        {/* Header Title */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Settings</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">Customize your Uranus chat experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left/Middle Column: Preferences & Themes */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Theme Section */}
            <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  Appearance
                </h2>
                <p className="text-xs text-slate-450 dark:text-slate-500 font-semibold mt-1">Choose your preferred style for the interface</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Theme options... */}
              </div>
            </section>

            {/* Wallpaper Section */}
            <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  Chat Wallpaper
                </h2>
                <p className="text-xs text-slate-450 dark:text-slate-500 font-semibold mt-1">Select your preferred chat background</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {['default', 'stars', 'ocean'].map((wp) => (
                  <button 
                    key={wp} 
                    onClick={() => setWallpaper(wp)} 
                    className={`h-24 rounded-xl border-4 ${wallpaper === wp ? 'border-blue-500' : 'border-slate-200 dark:border-slate-700'} bg-slate-100 dark:bg-slate-900 flex items-center justify-center font-bold text-slate-500`}
                  >
                    {wp.charAt(0).toUpperCase() + wp.slice(1)}
                  </button>
                ))}
              </div>
            </section>

            {/* Notification Preferences Section */}
            {authUser && (
              <section className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 shadow-sm space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    Notifications
                  </h2>
                  <p className="text-xs text-slate-450 dark:text-slate-500 font-semibold mt-1">Configure how you want to be notified</p>
                </div>

                <div className="space-y-4">
                  {/* DM Switch */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                        <MessageSquare className="size-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-850 dark:text-slate-100">Direct Messages</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Notifications for new private messages</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handlePreferenceChange("directMessage", !(authUser.notificationPreferences?.directMessage ?? true))}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${
                        (authUser.notificationPreferences?.directMessage ?? true) ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          (authUser.notificationPreferences?.directMessage ?? true) ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Group switch */}
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                        <Users className="size-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-850 dark:text-slate-100">Group Messages</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Notifications for new messages in groups</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handlePreferenceChange("groupMessage", !(authUser.notificationPreferences?.groupMessage ?? true))}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${
                        (authUser.notificationPreferences?.groupMessage ?? true) ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          (authUser.notificationPreferences?.groupMessage ?? true) ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Mentions switch */}
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500">
                        <AtSign className="size-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-850 dark:text-slate-100">Mentions & Replies</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">When someone mentions you or replies to you</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handlePreferenceChange("mention", !(authUser.notificationPreferences?.mention ?? true))}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${
                        (authUser.notificationPreferences?.mention ?? true) ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          (authUser.notificationPreferences?.mention ?? true) ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* System alerts switch */}
                  <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                        <Shield className="size-5" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-850 dark:text-slate-100">System & Security</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Important account and security alerts</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handlePreferenceChange("system", !(authUser.notificationPreferences?.system ?? true))}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none ${
                        (authUser.notificationPreferences?.system ?? true) ? "bg-blue-500" : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          (authUser.notificationPreferences?.system ?? true) ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="border-t border-slate-150 dark:border-slate-700 pt-4 mt-6">
                    <button
                      className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/50 dark:hover:bg-slate-700 border border-slate-200 dark:border-600 text-slate-750 dark:text-slate-200 rounded-xl font-bold text-xs transition-all active:scale-[0.98]"
                      onClick={() => useNotificationStore.getState().subscribeToPushNotifications()}
                    >
                      Enable Push Notifications
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Preview Pane */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1">Live Preview</h3>
            
            <div className="rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-slate-900/60 shadow-xl max-w-sm w-full mx-auto">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200/50 dark:border-slate-850/50">
                <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
                  
                  {/* Preview Chat Header */}
                  <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        J
                      </div>
                      <div>
                        <h3 className="font-bold text-xs text-slate-800 dark:text-slate-100 leading-tight">John Doe</h3>
                        <p className="text-[10px] text-emerald-500 font-bold mt-0.5">Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Preview Chat Messages */}
                  <div className="p-4 space-y-3 min-h-[160px] max-h-[160px] overflow-y-auto bg-slate-100 dark:bg-slate-900">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`
                            max-w-[80%] rounded-2xl px-3.5 py-2 shadow-sm text-xs font-medium
                            ${message.isSent 
                              ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-tr-none" 
                              : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200/40 dark:border-slate-700 rounded-tl-none"
                            }
                          `}
                        >
                          <p className="leading-relaxed">{message.content}</p>
                          <p
                            className={`
                              text-[8px] mt-1 text-right font-bold uppercase tracking-wider
                              ${message.isSent ? "text-white/60" : "text-slate-400 dark:text-slate-500"}
                            `}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Preview Chat Input */}
                  <div className="p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        className="flex-1 text-xs px-3 py-2 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-850 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="size-8 rounded-xl bg-blue-500 text-white flex items-center justify-center shadow-sm" disabled>
                        <Send size={14} />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
export default SettingsPage;
