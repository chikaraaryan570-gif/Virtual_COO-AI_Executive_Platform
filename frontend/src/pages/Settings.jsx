import { User, Bell, Shield, Key } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-8 p-6 max-w-4xl">
      <div>
        <h1 className="text-4xl font-bold text-white">Settings</h1>
        <p className="text-slate-400">Manage your account and application preferences</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-slate-800/50 border-r border-slate-800 p-6 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-xl transition-colors">
              <User size={20} />
              <span className="font-medium">Profile</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
              <Bell size={20} />
              <span className="font-medium">Notifications</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
              <Shield size={20} />
              <span className="font-medium">Security</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors">
              <Key size={20} />
              <span className="font-medium">API Keys</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Profile Information</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-400">First Name</label>
                  <input type="text" defaultValue="John" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-400">Last Name</label>
                  <input type="text" defaultValue="Doe" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-400">Email Address</label>
                <input type="email" defaultValue="john.doe@technova.com" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-400">Role</label>
                <input type="text" defaultValue="Chief Operating Officer" disabled className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-500 cursor-not-allowed" />
              </div>

              <div className="pt-6 border-t border-slate-800 flex justify-end">
                <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}