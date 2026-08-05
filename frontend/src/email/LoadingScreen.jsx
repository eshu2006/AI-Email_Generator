import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

function LoadingScreen() {
    const loadingMessages = [
        "Analyzing recipient details...",
        "Setting professional tone...",
        "Structuring email sections...",
        "Drafting subject line ideas...",
        "Fine-tuning email signature...",
        "AI is writing your email..."
    ];

    const [msgIdx, setMsgIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMsgIdx(prev => (prev + 1) % loadingMessages.length);
        }, 2200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full min-h-[450px] flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-3xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute w-60 h-60 rounded-full bg-[#6C63FF]/10 blur-[80px] pointer-events-none"></div>

            {/* Glowing Brain SVG Outer Structure */}
            <div className="relative mb-8">
                <motion.div
                    animate={{
                        scale: [1, 1.08, 1],
                        rotate: 360
                    }}
                    transition={{
                        scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 25, repeat: Infinity, ease: "linear" }
                    }}
                    className="absolute inset-0 w-24 h-24 rounded-full border border-dashed border-[#6C63FF]/30 blur-[2px]"
                ></motion.div>

                {/* Pulsing Core */}
                <motion.div
                    animate={{
                        boxShadow: [
                            "0 0 20px rgba(108, 99, 255, 0.4)",
                            "0 0 40px rgba(108, 99, 255, 0.8)",
                            "0 0 20px rgba(108, 99, 255, 0.4)"
                        ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-20 h-20 rounded-2xl bg-slate-900 border border-[#6C63FF]/50 flex items-center justify-center z-10 relative"
                >
                    <Cpu size={32} className="text-[#6C63FF] animate-pulse" />
                </motion.div>
            </div>

            {/* Thinking Dots */}
            <div className="flex items-center gap-1.5 mb-5">
                {[0, 1, 2].map((i) => (
                    <motion.span
                        key={i}
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut"
                        }}
                        className="w-2.5 h-2.5 rounded-full bg-[#6C63FF]"
                    ></motion.span>
                ))}
            </div>

            {/* Typing Animation Message */}
            <motion.h3 
                key={msgIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-white text-base font-semibold font-display tracking-wide mb-4 text-glow"
            >
                {loadingMessages[msgIdx]}
            </motion.h3>

            {/* Progress line */}
            <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div
                    initial={{ left: "-100%" }}
                    animate={{ left: "100%" }}
                    transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute w-2/3 h-full bg-gradient-to-r from-blue-500 to-[#6C63FF] rounded-full"
                ></motion.div>
            </div>
        </div>
    );
}

export default LoadingScreen;
