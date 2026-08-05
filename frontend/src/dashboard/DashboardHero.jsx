import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Cpu, Send } from "lucide-react";

function DashboardHero({ userName }) {
    const greetingName = userName || "Ravinder";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full relative glass-panel rounded-3xl p-8 lg:p-12 overflow-hidden bg-gradient-to-r from-white/5 to-white/0 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 mb-8"
        >
            {/* Ambient Background Glow inside Card */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#6C63FF]/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Left Content Column */}
            <div className="flex-1 text-left relative z-10">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-xs font-semibold text-[#6C63FF] mb-6"
                >
                    <Sparkles size={12} />
                    <span>Next-Gen Email Assistant</span>
                </motion.div>
                
                <h1 className="font-heading font-bold text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                    Welcome Back, <span className="text-[#6C63FF] text-glow">{greetingName}</span> 👋
                </h1>
                
                <p className="text-[#AAB3C5] mt-4 text-base lg:text-lg max-w-xl font-normal leading-relaxed">
                    Generate professional, persuasive, and custom AI emails in seconds. Save hours of composing and start sending copy that converts.
                </p>
            </div>

            {/* Right Illustration Column */}
            <div className="relative w-full md:w-72 lg:w-96 h-56 flex items-center justify-center">
                <motion.div
                    animate={{
                        y: [0, -12, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative w-48 h-48 flex items-center justify-center"
                >
                    {/* Concentric Glowing Circles */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#6C63FF]/20 to-blue-500/20 blur-xl opacity-80"></div>
                    <div className="absolute w-40 h-40 rounded-full border border-dashed border-[#6C63FF]/30 animate-[spin_40s_linear_infinite]"></div>
                    <div className="absolute w-32 h-32 rounded-full border border-white/10 animate-[spin_20s_linear_infinite_reverse]"></div>
                    
                    {/* Central CPU/Brain Icon */}
                    <div className="w-24 h-24 rounded-2xl bg-slate-900 border border-[#6C63FF]/30 flex items-center justify-center shadow-2xl relative z-10">
                        <Cpu size={40} className="text-[#6C63FF] drop-shadow-[0_0_8px_#6C63FF]" />
                    </div>

                    {/* Orbiting Elements */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-800 border border-blue-500/30 flex items-center justify-center shadow-lg">
                            <Send size={12} className="text-blue-400" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}

export default DashboardHero;
