import {
  LayoutDashboard,
  Bot,
  Wallet,
  Users,
  BarChart3,
  Briefcase,
  FileText,
  Settings,
  Building,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const menu = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "AI Assistant",
    icon: Bot,
    path: "/assistant",
  },
  {
    title: "Company",
    icon: Building,
    path: "/company",
  },
  {
    title: "Finance",
    icon: Wallet,
    path: "/finance",
  },
  {
    title: "HR",
    icon: Users,
    path: "/hr",
  },
  {
    title: "Sales",
    icon: BarChart3,
    path: "/sales",
  },
  {
    title: "Operations",
    icon: Briefcase,
    path: "/operations",
  },
  {
    title: "Reports",
    icon: FileText,
    path: "/reports",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 glass-panel my-4 ml-4 rounded-2xl flex flex-col overflow-hidden relative z-20 border border-white/10">
      {/* Subtle top neon ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent shadow-[0_0_10px_#00f2fe]" />

      <Logo />

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 hover:scale-[1.02] ${isActive
                  ? "active-glow font-semibold"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-white/5 p-4">
        <div className="rounded-xl bg-white/5 border border-white/5 p-3 backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
            System Status
          </p>

          <div className="mt-2 flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse"></div>
            <span className="text-xs font-medium text-emerald-400">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}