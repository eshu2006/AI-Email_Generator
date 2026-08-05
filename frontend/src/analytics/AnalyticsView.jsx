import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Clock, Smile, Sparkles, Send } from "lucide-react";

function AnalyticsView() {
    const summaryCards = [
        { title: "Weekly Growth", value: "+24.8%", desc: "vs. previous week", trend: "up", icon: TrendingUp },
        { title: "Avg. Generation Time", value: "3.4s", desc: "using gemini-2.5-flash", trend: "stable", icon: Clock },
        { title: "Tone Alignment", value: "98.2%", desc: "compliance score", trend: "up", icon: Smile },
        { title: "Success Rate", value: "100%", desc: "system uptime", trend: "up", icon: Send }
    ];

    return (
        <div className="w-full text-left">
            <div className="mb-8">
                <h2 className="font-heading font-bold text-3xl text-white">Platform Analytics</h2>
                <p className="text-[#AAB3C5] mt-1 text-sm">Real-time metrics, performance analytics, and tone insights.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {summaryCards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            className="glass-panel rounded-3xl p-6 bg-white/5 border border-white/10"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-[#AAB3C5] uppercase tracking-wider">{card.title}</span>
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                    <Icon size={16} />
                                </div>
                            </div>
                            <div className="mt-4 flex items-baseline gap-2">
                                <span className="text-3xl font-heading font-bold text-white">{card.value}</span>
                                <span className="text-[10px] text-[#AAB3C5]">{card.desc}</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Visual Charts section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Tone Breakdown simulated bar chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="glass-panel rounded-3xl p-6 lg:p-8 bg-white/5 border border-white/10 text-left"
                >
                    <h3 className="font-heading font-bold text-lg text-white mb-6">Tone Usage Frequency</h3>
                    <div className="space-y-4">
                        {[
                            { name: "Professional", percent: 65, color: "bg-[#6C63FF]" },
                            { name: "Formal", percent: 20, color: "bg-blue-500" },
                            { name: "Friendly", percent: 10, color: "bg-emerald-500" },
                            { name: "Urgent", percent: 5, color: "bg-rose-500" }
                        ].map((tone, idx) => (
                            <div key={idx} className="space-y-1.5">
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-white">{tone.name}</span>
                                    <span className="text-[#AAB3C5]">{tone.percent}%</span>
                                </div>
                                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${tone.percent}%` }}
                                        transition={{ duration: 1, delay: 0.3 + idx * 0.1 }}
                                        className={`h-full ${tone.color} rounded-full`}
                                    ></motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Generated over time simulated area chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="glass-panel rounded-3xl p-6 lg:p-8 bg-white/5 border border-white/10 text-left"
                >
                    <h3 className="font-heading font-bold text-lg text-white mb-4">Volume Trends (Weekly)</h3>
                    <div className="h-44 w-full flex items-end gap-2.5 pt-6 border-b border-white/10">
                        {[20, 35, 48, 65, 58, 85, 94].map((val, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${val}%` }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    className="w-full bg-gradient-to-t from-[#6C63FF]/30 to-[#6C63FF] hover:to-blue-400 rounded-t-lg relative group transition cursor-pointer shadow-lg shadow-[#6C63FF]/10"
                                >
                                    {/* Tooltip on Hover */}
                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-950 border border-white/10 text-[9px] font-bold text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {val}
                                    </div>
                                </motion.div>
                                <span className="text-[10px] text-[#AAB3C5] mt-2 font-display uppercase tracking-wider">
                                    {["M", "T", "W", "T", "F", "S", "S"][idx]}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default AnalyticsView;
