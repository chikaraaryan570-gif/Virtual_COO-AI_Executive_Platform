import { Bell, Search, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-20 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-8">

      <div>

        <h1 className="text-3xl font-bold text-white">
          Executive Dashboard
        </h1>

        <p className="text-slate-400 text-sm">
          Welcome back 👋
        </p>

      </div>

      <div className="flex items-center gap-5">

        <button className="text-slate-400 hover:text-white transition">
          <Search size={22} />
        </button>

        <button className="text-slate-400 hover:text-white transition">
          <Bell size={22} />
        </button>

        <button className="text-blue-400">
          <UserCircle size={38} />
        </button>

      </div>

    </header>
  );
}