import React, { useState } from "react";
import { Search, Bell, Moon, Sun, User, LogOut, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ user, onLogout, onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

    const dummyNotifications = [
        { id: 1, text: "AI Model updated to Gemini 1.5 Flash", time: "5 mins ago" },
        { id: 2, text: "Successfully exported PDF 'Meeting Notes'", time: "1 hour ago" },
        { id: 3, text: "Your daily email generation limit is reset", time: "Today" },
    ];

    return (
        <nav className="sticky top-0 left-0 w-full z-30 bg-[#050816]/70 backdrop-blur-md border-b border-white/10 px-8 py-4 flex items-center justify-between">
            {/* Left Brand Area */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6C63FF] to-indigo-500 flex items-center justify-center shadow-lg shadow-[#6C63FF]/30">
                    <Mail size={16} className="text-white" />
                </div>
                <span className="font-display font-bold text-lg tracking-wider text-white hidden sm:block">
                    AI Email Generator
                </span>
            </div>

            {/* Center: Global Search Bar */}
            <div className="flex-1 max-w-md mx-8 relative hidden md:block">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAB3C5]" size={16} />
                    <input
                        type="text"
                        placeholder="Search emails, prompts, tone..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-[#AAB3C5] focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF]/30 transition duration-300"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                {/* Dark Mode Toggle */}
                <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition cursor-pointer"
                >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Notifications Hub */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition cursor-pointer relative"
                    >
                        <Bell size={18} />
                        <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#6C63FF] ring-2 ring-[#050816]"></span>
                    </button>

                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-3 w-80 glass-panel bg-[#0F172A] border border-white/10 rounded-2xl shadow-2xl p-4 z-50 overflow-hidden"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-heading font-semibold text-sm text-white">Notifications</h4>
                                    <button onClick={() => setShowNotifications(false)} className="text-xs text-[#6C63FF] hover:underline cursor-pointer">Mark all read</button>
                                </div>
                                <div className="space-y-2">
                                    {dummyNotifications.map((n) => (
                                        <div key={n.id} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition text-xs">
                                            <p className="text-white font-medium">{n.text}</p>
                                            <p className="text-[#AAB3C5] mt-1">{n.time}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* User Avatar dropdown */}
                <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-blue-500 flex items-center justify-center text-white font-bold font-display shadow-lg">
                        {user?.name ? user.name[0].toUpperCase() : "U"}
                    </div>
                    <div className="hidden lg:block text-left">
                        <p className="text-sm font-semibold text-white leading-tight">{user?.name || "Guest"}</p>
                        <button
                            onClick={onLogout}
                            className="text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1 mt-0.5 transition cursor-pointer"
                        >
                            <LogOut size={10} /> Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
