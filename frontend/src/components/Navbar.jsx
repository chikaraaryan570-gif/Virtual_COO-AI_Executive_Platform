import { useState, useRef, useEffect } from "react";
import { Bell, Search, UserCircle, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const notificationsRef = useRef(null);
  const searchRef = useRef(null);

  // Mock real-time business logs
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Acme Corp deal moved to Negotiation stage.", time: "10m ago", read: false },
    { id: 2, text: "Operations alert: Server migration is 65% complete.", time: "2h ago", read: false },
    { id: 3, text: "Financial report: Monthly revenue targets reached.", time: "1d ago", read: true }
  ]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (hasNewNotifications) {
      setHasNewNotifications(false);
      // Mark all as read
      setNotifications(notifications.map(n => ({ ...n, read: true })));
    }
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Quick navigation search items
  const searchItems = [
    { name: "Dashboard", path: "/" },
    { name: "AI Assistant", path: "/assistant" },
    { name: "Company Profile", path: "/company" },
    { name: "Finance Overview", path: "/finance" },
    { name: "Human Resources", path: "/hr" },
    { name: "Sales Pipeline", path: "/sales" },
    { name: "Operations Tasks", path: "/operations" },
    { name: "Reports Archive", path: "/reports" },
    { name: "Account Settings", path: "/settings" }
  ];

  const filteredItems = searchQuery
    ? searchItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleSearchSelect = (path) => {
    navigate(path);
    setSearchQuery("");
    setShowSearch(false);
  };

  return (
    <header className="h-20 border-b border-white/5 bg-transparent flex items-center justify-between px-8 relative z-30">

      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <h1 
            className="text-3xl font-extrabold uppercase cursor-pointer tracking-wider select-none" 
            onClick={() => navigate("/")}
            style={{
              background: "linear-gradient(90deg, #ffffff 0%, #00f2fe 55%, #9d4edd 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 2px 12px rgba(0, 242, 254, 0.35))"
            }}
          >
            Virtual COO Panel
          </h1>
          <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
        </div>

        <p className="text-slate-300 text-[10px] font-bold tracking-widest uppercase mt-1.5 flex items-center gap-1.5">
          <span>🌌</span>
          <span>AI Executive Officer Dashboard</span>
        </p>
      </div>

      <div className="flex items-center gap-5">
        
        {/* Search Bar */}
        <div ref={searchRef} className="relative">
          {showSearch ? (
            <div className="flex items-center gap-2 bg-slate-950/80 border border-white/10 rounded-xl px-3 py-1.5 transition-all duration-300">
              <Search size={18} className="text-cyan-400" />
              <input 
                type="text" 
                placeholder="Search panel..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-white text-xs outline-none w-40 placeholder-slate-500"
                autoFocus
              />
              <button onClick={() => { setShowSearch(false); setSearchQuery(""); }} className="text-slate-400 hover:text-white">
                <X size={16} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowSearch(true)} 
              className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-115 p-2 rounded-lg hover:bg-white/5"
            >
              <Search size={20} />
            </button>
          )}

          {/* Search Results Dropdown */}
          {showSearch && filteredItems.length > 0 && (
            <div className="absolute right-0 mt-2 w-56 glass-panel rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950/90 z-40">
              <div className="py-1">
                {filteredItems.map(item => (
                  <button
                    key={item.name}
                    onClick={() => handleSearchSelect(item.path)}
                    className="w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:bg-white/5 hover:text-cyan-400 transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications (Bell) */}
        <div ref={notificationsRef} className="relative">
          <button 
            onClick={toggleNotifications}
            className="text-slate-400 hover:text-purple-400 transition-all duration-300 hover:scale-115 relative p-2 rounded-lg hover:bg-white/5"
          >
            <Bell size={20} />
            {hasNewNotifications && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 glass-panel rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950/90 z-40">
              <div className="px-4 py-3 border-b border-white/5 bg-slate-950/50 flex justify-between items-center">
                <span className="text-xs font-bold text-white uppercase tracking-wider">COO logs</span>
                <span className="text-[10px] text-purple-400 font-semibold">Active Engine</span>
              </div>
              <div className="divide-y divide-white/5 max-h-64 overflow-y-auto">
                {notifications.map(notif => (
                  <div key={notif.id} className="p-4 hover:bg-white/[0.02] transition-colors">
                    <p className="text-xs text-slate-300 leading-relaxed">{notif.text}</p>
                    <span className="text-[10px] text-slate-500 font-medium block mt-1">{notif.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Settings profile redirect */}
        <button 
          onClick={() => navigate("/settings")}
          className="text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110 p-1 rounded-full hover:bg-white/5"
          title="Profile Settings"
        >
          <UserCircle size={32} />
        </button>

        {/* Logout */}
        <button 
          onClick={logout}
          className="text-slate-400 hover:text-red-400 transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-white/5"
          title="Logout"
        >
          <LogOut size={24} />
        </button>
      </div>

    </header>
  );
}