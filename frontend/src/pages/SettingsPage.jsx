import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNotificationStore } from "../store/useNotificationStore";
import { Send, Bell, MessageSquare, Users, AtSign, Shield } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
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
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl overflow-y-auto pb-20">
      <div className="space-y-8">
        {/* Theme Section */}
        <section className="space-y-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">Theme</h2>
            <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`
                  group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                  ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
                `}
                onClick={() => setTheme(t)}
              >
                <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                </div>
                <span className="text-[11px] font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Notification Preferences Section */}
        {authUser && (
          <section className="space-y-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <p className="text-sm text-base-content/70">Configure how you want to be notified</p>
            </div>

            <div className="bg-base-200 rounded-xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <MessageSquare className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium">Direct Messages</p>
                    <p className="text-xs text-base-content/60">Notifications for new private messages</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={authUser.notificationPreferences?.directMessage ?? true}
                  onChange={(e) => handlePreferenceChange("directMessage", e.target.checked)}
                />
              </div>

              <div className="flex items-center justify-between border-t border-base-300 pt-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                    <Users className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium">Group Messages</p>
                    <p className="text-xs text-base-content/60">Notifications for new messages in groups</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-secondary"
                  checked={authUser.notificationPreferences?.groupMessage ?? true}
                  onChange={(e) => handlePreferenceChange("groupMessage", e.target.checked)}
                />
              </div>

              <div className="flex items-center justify-between border-t border-base-300 pt-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <AtSign className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium">Mentions & Replies</p>
                    <p className="text-xs text-base-content/60">When someone mentions you or replies to you</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-accent"
                  checked={authUser.notificationPreferences?.mention ?? true}
                  onChange={(e) => handlePreferenceChange("mention", e.target.checked)}
                />
              </div>

              <div className="flex items-center justify-between border-t border-base-300 pt-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-info/10 flex items-center justify-center text-info">
                    <Shield className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium">System & Security</p>
                    <p className="text-xs text-base-content/60">Important account and security alerts</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-info"
                  checked={authUser.notificationPreferences?.system ?? true}
                  onChange={(e) => handlePreferenceChange("system", e.target.checked)}
                />
              </div>
            </div>
          </section>
        )}

        {/* Preview Section */}
        <h3 className="text-lg font-semibold mb-3">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              {/* Mock Chat UI */}
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat Header */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">John Doe</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`
                            text-[10px] mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                          `}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} />
                    </button>
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
