export default function Logo() {
    return (
        <div className="flex items-center gap-3 px-6 py-5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white">
                VC
            </div>

            <div>
                <h1 className="text-lg font-bold text-white">
                    Virtual COO
                </h1>
                <p className="text-xs text-slate-400">
                    AI Executive Platform
                </p>
            </div>
        </div>
    );
}