import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import toast from "react-hot-toast";

const MAX_FILE_SIZE_MB = 7;

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(`Image must be smaller than ${MAX_FILE_SIZE_MB}MB`);
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-200 overflow-y-auto">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xl transition-all duration-200">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Profile</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-semibold">Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-slate-100 dark:border-slate-900 shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-blue-500 hover:bg-blue-600 text-white hover:scale-105
                  p-2.5 rounded-full cursor-pointer 
                  transition-all duration-200 shadow-md
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100 text-sm">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100 text-sm">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-6 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
            <h2 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700 text-slate-750 dark:text-slate-200 font-medium">
                <span>Member Since</span>
                <span className="font-bold">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2 text-slate-750 dark:text-slate-200 font-medium">
                <span>Account Status</span>
                <span className="text-emerald-500 dark:text-emerald-450 font-bold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
