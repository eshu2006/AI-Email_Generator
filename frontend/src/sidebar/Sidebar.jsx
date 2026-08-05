import React from "react";
import { motion } from "framer-motion";
import { 
    LayoutDashboard, 
    Mail, 
    History, 
    Star, 
    Folder, 
    BarChart3, 
    Settings, 
    LogOut,
    User
} from "lucide-react";

function Sidebar({ 
    activeTab, 
    setActiveTab, 
    user, 
    onLogout, 
    toggleHistoryDrawer 
}) {
    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "generator", label: "AI Generator", icon: Mail },
        { id: "history", label: "History", icon: History, isDrawerAction: true },
        { id: "templates", label: "Templates", icon: Star },
        { id: "drafts", label: "Drafts", icon: Folder },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    return (
        <div 
            className="w-[280px] h-screen sticky top-0 left-0 flex flex-col glass-panel border-r border-white/10 z-40 bg-[#0F172A]/10 backdrop-blur-xl shrink-0"
        >
            {/* Sidebar Brand Logo */}
            <div className="p-6 flex items-center gap-3 border-b border-white/5 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-blue-500 flex items-center justify-center shrink-0 shadow-lg shadow-[#6C63FF]/30">
                    <span className="font-display font-bold text-lg text-white">AI</span>
                </div>
                <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent white-space-nowrap">
                    MailOS
                </span>
            </div>

            {/* Menu Items */}
            <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.isDrawerAction) {
                                    toggleHistoryDrawer();
                                } else {
                                    setActiveTab(item.id);
                                }
                            }}
                            className={`w-full group relative flex items-center gap-3.5 p-3.5 rounded-2xl cursor-pointer transition-all duration-300 ${
                                isActive 
                                    ? "text-white" 
                                    : "text-[#AAB3C5] hover:text-white hover:bg-white/5"
                            }`}
                        >
                            {/* Hover Glow Background */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#6C63FF]/10 to-[#6C63FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            {/* Active Tab Glow Pill */}
                            {isActive && (
                                <motion.div 
                                    layoutId="active-indicator"
                                    className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#6C63FF] shadow-[0_0_12px_#6C63FF]"
                                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                />
                            )}

                            <Icon size={20} className={`shrink-0 transition-transform group-hover:scale-110 duration-300 ${isActive ? "text-[#6C63FF]" : ""}`} />

                            <span className="font-medium text-sm whitespace-nowrap">
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Profile and Logout Section */}
            <div className="p-4 border-t border-white/5 overflow-hidden">
                <div className="flex items-center gap-3.5 rounded-2xl p-2.5 bg-white/5 border border-white/5 transition duration-300">
                    <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                        <User size={16} className="text-[#AAB3C5]" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate text-white">
                            {user?.name || "Guest User"}
                        </p>
                        <p className="text-xs text-[#AAB3C5] truncate">
                            {user?.email || "guest@mail.com"}
                        </p>
                    </div>
                </div>

                <button
                    onClick={onLogout}
                    className="mt-4 w-full group relative flex items-center gap-3.5 p-3.5 rounded-2xl cursor-pointer text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition duration-300"
                >
                    <LogOut size={20} className="shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span className="font-semibold text-sm">Logout</span>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
