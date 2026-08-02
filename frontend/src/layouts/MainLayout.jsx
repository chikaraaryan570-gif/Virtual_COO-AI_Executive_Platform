import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import GalaxyBackground from "../components/GalaxyBackground";

export default function MainLayout() {
    return (
        <div className="flex h-screen bg-transparent text-white overflow-hidden relative">
            <GalaxyBackground />
            <Sidebar />

            <div className="flex flex-1 flex-col relative z-10">
                <Navbar />

                <main className="flex-1 overflow-y-auto p-8 scrollbar-thin">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}