import { motion } from "framer-motion";
import { LayoutDashboard } from "lucide-react";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Left side - Branding & Abstract Art */}
      <div className="relative hidden md:flex md:w-1/2 bg-gradient-to-br from-[#0a0a0a] to-[#121212] flex-col justify-between p-12 border-r border-white/5">
        
        {/* Background Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
            <LayoutDashboard className="text-white w-5 h-5" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Virtual COO</span>
        </div>

        <div className="relative z-10 mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl font-bold text-white leading-tight mb-6"
          >
            Empower your <br/>
            <span style={{ background: "linear-gradient(to right, #60a5fa, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              business operations
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-gray-400 text-lg max-w-md"
          >
            The intelligent dashboard for modern executives. Manage, analyze, and scale with ease.
          </motion.p>
        </div>

        <div className="relative z-10 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Virtual COO. All rights reserved.
        </div>
      </div>

      {/* Right side - Form Area */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Mobile Orbs (visible only on small screens) */}
        <div className="absolute top-0 left-0 w-full h-full md:hidden overflow-hidden pointer-events-none">
           <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-blue-500/10 rounded-full blur-[100px]" />
           <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile Logo */}
          <div className="md:hidden flex items-center justify-center gap-3 mb-10">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <LayoutDashboard className="text-white w-6 h-6" />
            </div>
          </div>

          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
            <p className="text-gray-400 text-sm">{subtitle}</p>
          </div>

          <div className="bg-[#111111]/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border border-white/5 md:border-none rounded-3xl p-6 sm:p-8 md:p-0 shadow-2xl md:shadow-none">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
