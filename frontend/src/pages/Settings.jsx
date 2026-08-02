import { useState } from "react";
import { User, Bell, Shield, Key, Eye, Copy, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [apiKey, setApiKey] = useState("vcoo_live_8f3d9k2j1s9a7x6c5b4v3n2m1");
  const [showApiKey, setShowApiKey] = useState(false);

  // Dynamic API Key generator
  const regenerateKey = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let newKey = "vcoo_live_";
    for (let i = 0; i < 24; i++) {
      newKey += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setApiKey(newKey);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    alert("API Key copied to clipboard!");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-6 max-w-4xl"
    >
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)]">
          Settings
        </h1>
        <p className="text-slate-400 text-sm mt-1">Manage your account and application preferences</p>
      </div>

      <div className="glass-panel border border-white/5 bg-white/[0.01] rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 bg-slate-950/20 border-r border-white/5 p-6 space-y-2">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === "profile" 
                  ? "active-glow font-semibold" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <User size={20} />
              <span className="font-medium">Profile</span>
            </button>

            <button 
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === "notifications" 
                  ? "active-glow font-semibold" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Bell size={20} />
              <span className="font-medium">Notifications</span>
            </button>

            <button 
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === "security" 
                  ? "active-glow font-semibold" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Shield size={20} />
              <span className="font-medium">Security</span>
            </button>

            <button 
              onClick={() => setActiveTab("api")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === "api" 
                  ? "active-glow font-semibold" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Key size={20} />
              <span className="font-medium">API Keys</span>
            </button>
          </div>

          {/* Dynamic Settings Content */}
          <div className="flex-1 p-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Profile Information</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">First Name</label>
                        <input type="text" defaultValue="John" className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all duration-300" />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Name</label>
                        <input type="text" defaultValue="Doe" className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all duration-300" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                      <input type="email" defaultValue="john.doe@technova.com" className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all duration-300" />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</label>
                      <input type="text" defaultValue="Chief Operating Officer" disabled className="w-full bg-slate-950/30 border border-white/5 rounded-lg px-4 py-2.5 text-slate-500 cursor-not-allowed font-medium" />
                    </div>

                    <div className="pt-6 border-t border-white/5 flex justify-end">
                      <button type="button" className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:opacity-90 text-white px-6 py-2.5 rounded-lg font-bold shadow-[0_0_15px_rgba(157,78,221,0.4)] transition-all duration-300 hover:scale-103">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {activeTab === "notifications" && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Notification Settings</h2>
                  <form className="space-y-6">
                    <div className="space-y-4">
                      
                      <div className="flex items-center justify-between p-4 bg-slate-950/30 rounded-xl border border-white/5">
                        <div>
                          <h3 className="text-sm font-semibold text-white">Email Daily Briefings</h3>
                          <p className="text-xs text-slate-400 mt-1">Receive daily company health and reports summary via email.</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-cyan-400 cursor-pointer" />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-950/30 rounded-xl border border-white/5">
                        <div>
                          <h3 className="text-sm font-semibold text-white">Critical System Alerts</h3>
                          <p className="text-xs text-slate-400 mt-1">Get notified immediately when critical alerts arise in operations.</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-cyan-400 cursor-pointer" />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-950/30 rounded-xl border border-white/5">
                        <div>
                          <h3 className="text-sm font-semibold text-white">AI COO Recommendations</h3>
                          <p className="text-xs text-slate-400 mt-1">Receive custom performance advice from your Virtual COO.</p>
                        </div>
                        <input type="checkbox" className="w-5 h-5 accent-cyan-400 cursor-pointer" />
                      </div>

                    </div>

                    <div className="pt-6 border-t border-white/5 flex justify-end">
                      <button type="button" className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:opacity-90 text-white px-6 py-2.5 rounded-lg font-bold shadow-[0_0_15px_rgba(157,78,221,0.4)] transition-all duration-300 hover:scale-103">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {activeTab === "security" && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Security Preferences</h2>
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all duration-300" />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">New Password</label>
                        <input type="password" placeholder="Min. 8 characters" className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all duration-300" />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Confirm New Password</label>
                        <input type="password" placeholder="••••••••" className="w-full bg-slate-950/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition-all duration-300" />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex justify-end">
                      <button type="button" className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:opacity-90 text-white px-6 py-2.5 rounded-lg font-bold shadow-[0_0_15px_rgba(157,78,221,0.4)] transition-all duration-300 hover:scale-103">
                        Update Password
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {activeTab === "api" && (
                <motion.div
                  key="api"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">API Key Management</h2>
                  <div className="space-y-6">
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Use this API key to connect your external business platforms (ERP, Salesforce, Slack) to the Virtual COO analysis engine.
                    </p>

                    <div className="p-4 bg-slate-950/40 border border-white/5 rounded-xl flex items-center justify-between gap-4">
                      <div className="flex-1 font-mono text-xs overflow-x-auto text-cyan-300 bg-black/30 p-2 rounded border border-white/5 select-all">
                        {showApiKey ? apiKey : apiKey.replace(/.(?=.{4})/g, "•")}
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        <button 
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition"
                          title="Show/Hide API Key"
                        >
                          <Eye size={18} />
                        </button>
                        
                        <button 
                          onClick={copyToClipboard}
                          className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition"
                          title="Copy to Clipboard"
                        >
                          <Copy size={18} />
                        </button>

                        <button 
                          onClick={regenerateKey}
                          className="p-2 text-slate-400 hover:text-cyan-400 bg-white/5 hover:bg-white/10 rounded-lg transition"
                          title="Regenerate Key"
                        >
                          <RefreshCw size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="rounded-xl border border-dashed border-white/10 p-5 text-center">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest block mb-1">Integration Status</span>
                      <span className="text-sm font-bold text-emerald-400 flex items-center justify-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                        Connected & Firing Events
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </motion.div>
  );
}