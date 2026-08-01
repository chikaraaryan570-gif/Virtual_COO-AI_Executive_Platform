import { Bell, Search } from "lucide-react";

export default function Topbar() {
    return (
        <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8">

            <div className="relative">

                <Search
                    size={18}
                    className="absolute left-3 top-3 text-slate-500"
                />

                <input
                    placeholder="Search..."
                    className="bg-slate-900 rounded-xl pl-10 pr-4 py-2 text-white outline-none w-80 border border-slate-800"
                />

            </div>

            <div className="flex items-center gap-6">

                <Bell className="text-slate-300" />

                <div className="flex items-center gap-3">

                    <img
                        src="https://i.pravatar.cc/100"
                        className="w-10 h-10 rounded-full"
                    />

                    <div>

                        <h3 className="text-white text-sm font-semibold">
                            CEO
                        </h3>

                        <p className="text-slate-400 text-xs">
                            Executive Access
                        </p>

                    </div>

                </div>

            </div>

        </header>
    );
}