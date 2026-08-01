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
    <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col">

      <Logo />

      <nav className="flex-1 p-4 space-y-2">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
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

      <div className="border-t border-slate-800 p-5">

        <div className="rounded-xl bg-slate-800 p-4">

          <p className="text-xs text-slate-500">
            System Status
          </p>

          <div className="mt-2 flex items-center gap-2">

            <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>

            <span className="text-sm text-green-400">
              All Systems Operational
            </span>

          </div>

        </div>

      </div>

    </aside>
  );
}