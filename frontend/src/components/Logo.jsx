export default function Logo() {
    return (
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/5 bg-slate-950/20">
            <img 
                src="/logo.png" 
                alt="Virtual COO Logo" 
                className="w-11 h-11 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.3)] border border-white/10 object-cover"
            />

            <div>
                <h1 className="text-sm font-black tracking-widest text-white uppercase select-none">
                    Virtual COO
                </h1>
                <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider select-none">
                    Executive Intelligence
                </p>
            </div>
        </div>
    );
}