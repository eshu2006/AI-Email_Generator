import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    X, 
    Search, 
    Trash2, 
    Star, 
    ExternalLink, 
    Calendar, 
    User, 
    Filter,
    FolderHeart
} from "lucide-react";

function HistoryDrawer({ isOpen, onClose, setEmail, history = [], onReload }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState("all"); // 'all' | 'favorites'
    const [favorites, setFavorites] = useState([]);
    const [deletedIds, setDeletedIds] = useState([]);

    // Load local storage states for favorites and deleted items
    useEffect(() => {
        const storedFavs = localStorage.getItem("email_favorites");
        if (storedFavs) {
            setFavorites(JSON.parse(storedFavs));
        }
        const storedDeletes = localStorage.getItem("email_deleted");
        if (storedDeletes) {
            setDeletedIds(JSON.parse(storedDeletes));
        }
    }, [isOpen]);

    const toggleFavorite = (item) => {
        const itemKey = `${item.subject}_${item.created_at}`;
        let newFavs;
        if (favorites.includes(itemKey)) {
            newFavs = favorites.filter(k => k !== itemKey);
        } else {
            newFavs = [...favorites, itemKey];
        }
        setFavorites(newFavs);
        localStorage.setItem("email_favorites", JSON.stringify(newFavs));
    };

    const handleDelete = (item) => {
        const itemKey = `${item.subject}_${item.created_at}`;
        const newDeletes = [...deletedIds, itemKey];
        setDeletedIds(newDeletes);
        localStorage.setItem("email_deleted", JSON.stringify(newDeletes));
    };

    const handleReuse = (item) => {
        setEmail(item);
        onClose();
    };

    // Filtered history list
    const filteredHistory = history
        .filter(item => {
            const itemKey = `${item.subject}_${item.created_at}`;
            // Filter out deleted items
            if (deletedIds.includes(itemKey)) return false;

            // Filter by search query
            const textMatch = 
                item.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.recipient?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.purpose?.toLowerCase().includes(searchQuery.toLowerCase());

            if (!textMatch) return false;

            // Filter by type
            if (filterType === "favorites") {
                return favorites.includes(itemKey);
            }

            return true;
        });

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black z-45"
                    />

                    {/* Drawer Content */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full max-w-[460px] bg-[#0A0F24]/95 border-l border-white/10 shadow-2xl z-50 flex flex-col backdrop-blur-2xl text-left"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF]">
                                    <FolderHeart size={18} />
                                </div>
                                <h2 className="font-heading font-bold text-xl text-white">
                                    Email Vault
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition cursor-pointer text-[#AAB3C5] hover:text-white"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Search and Filters */}
                        <div className="p-6 space-y-4 border-b border-white/5 bg-white/2">
                            {/* Search bar */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAB3C5]" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search generated vault..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-[#AAB3C5] focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF]/30 transition duration-300 text-sm"
                                />
                            </div>

                            {/* Filters row */}
                            <div className="flex items-center justify-between gap-2.5">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setFilterType("all")}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                                            filterType === "all"
                                                ? "bg-[#6C63FF] border-[#6C63FF] text-white"
                                                : "bg-white/5 border-white/10 text-[#AAB3C5] hover:text-white"
                                        }`}
                                    >
                                        All Saved
                                    </button>
                                    <button
                                        onClick={() => setFilterType("favorites")}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 cursor-pointer ${
                                            filterType === "favorites"
                                                ? "bg-amber-500 border-amber-500 text-slate-950"
                                                : "bg-white/5 border-white/10 text-[#AAB3C5] hover:text-white"
                                        }`}
                                    >
                                        <Star size={12} fill={filterType === "favorites" ? "currentColor" : "none"} />
                                        <span>Favorites</span>
                                    </button>
                                </div>
                                <div className="flex items-center gap-1 text-[#AAB3C5] text-xs font-medium">
                                    <Filter size={12} />
                                    <span>{filteredHistory.length} items</span>
                                </div>
                            </div>
                        </div>

                        {/* List Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-5 relative">
                            {/* Vertical Timeline line */}
                            <div className="absolute left-[39px] top-8 bottom-8 w-[1px] bg-gradient-to-b from-blue-500/20 via-[#6C63FF]/20 to-transparent pointer-events-none"></div>

                            {filteredHistory.length === 0 ? (
                                <div className="py-20 text-center text-[#AAB3C5] text-sm">
                                    No records found matching filters.
                                </div>
                            ) : (
                                filteredHistory.map((item, idx) => {
                                    const itemKey = `${item.subject}_${item.created_at}`;
                                    const isFav = favorites.includes(itemKey);
                                    const dateObj = item.created_at ? new Date(item.created_at) : new Date();
                                    const formattedDate = dateObj.toLocaleDateString(undefined, { 
                                        month: 'short', 
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    });

                                    return (
                                        <motion.div
                                            key={itemKey}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: idx * 0.05 }}
                                            className="relative pl-9 flex flex-col text-left group"
                                        >
                                            {/* Timeline Node */}
                                            <div className="absolute left-[33px] top-2.5 w-3 h-3 rounded-full border border-[#6C63FF] bg-[#0A0F24] z-10 flex items-center justify-center group-hover:bg-[#6C63FF] group-hover:scale-125 transition duration-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#6C63FF] group-hover:bg-white transition duration-300"></div>
                                            </div>

                                            {/* Content Card */}
                                            <div className="glass-panel bg-white/2 hover:bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all duration-300 flex flex-col justify-between gap-4 shadow-xl">
                                                <div>
                                                    {/* Subject & Actions */}
                                                    <div className="flex items-start justify-between gap-3">
                                                        <h4 className="font-heading font-semibold text-sm text-white group-hover:text-[#6C63FF] transition duration-300 truncate pr-2">
                                                            {item.subject || "No Subject"}
                                                        </h4>

                                                        <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => toggleFavorite(item)}
                                                                className={`p-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer ${
                                                                    isFav ? "text-amber-400" : "text-[#AAB3C5]"
                                                                }`}
                                                            >
                                                                <Star size={13} fill={isFav ? "currentColor" : "none"} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(item)}
                                                                className="p-1.5 rounded-lg hover:bg-rose-500/10 text-[#AAB3C5] hover:text-rose-400 transition cursor-pointer"
                                                            >
                                                                <Trash2 size={13} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleReuse(item)}
                                                                className="p-1.5 rounded-lg hover:bg-[#6C63FF]/15 text-[#AAB3C5] hover:text-[#6C63FF] transition cursor-pointer"
                                                                title="Load this Email"
                                                            >
                                                                <ExternalLink size={13} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Metadata: Date and Recipient */}
                                                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#AAB3C5] mt-2">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar size={10} />
                                                            <span>{formattedDate}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <User size={10} />
                                                            <span className="truncate max-w-[120px]">{item.recipient}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Preview body */}
                                                <p className="text-xs text-[#AAB3C5] line-clamp-2 border-t border-white/5 pt-3 leading-relaxed">
                                                    {item.body}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default HistoryDrawer;
