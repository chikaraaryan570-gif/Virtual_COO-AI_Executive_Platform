import { Bell, Search, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Topbar() {
    const { user, logout } = useAuth();

    return (
        <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8">
            <div className="relative">
                <Search size={18} className="absolute left-3 top-3 text-slate-500" />
                <input
                    placeholder="Search..."
                    className="bg-slate-900 rounded-xl pl-10 pr-4 py-2 text-white outline-none w-80 border border-slate-800"
                />
            </div>
            <div className="flex items-center gap-6">
                <Bell className="text-slate-300 cursor-pointer" />
                <div className="flex items-center gap-3">
                    <img
                        src={user?.picture || "https://i.pravatar.cc/100"}
                        className="w-10 h-10 rounded-full"
                        alt="Profile"
                        referrerPolicy="no-referrer"
                    />
                    <div>
                        <h3 className="text-white text-sm font-semibold">
                            {user?.name || "CEO"}
                        </h3>
                        <p className="text-slate-400 text-xs">
                            {user?.email || "Executive Access"}
                        </p>
                    </div>
                </div>
                <button 
                    onClick={logout}
                    className="ml-4 p-2 text-slate-400 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-colors"
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </header>
    );
}