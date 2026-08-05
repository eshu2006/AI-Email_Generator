import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { MailCheck, History, BookOpen, Send } from "lucide-react";

// Animated Counter helper component
function Counter({ value }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 1.5,
            ease: "easeOut",
            onUpdate: (latest) => setCount(Math.floor(latest))
        });
        return () => controls.stop();
    }, [value]);

    return <span>{count}</span>;
}

function StatCards({ stats }) {
    // Fallback values if none provided
    const cardData = [
        {
            title: "Emails Generated",
            value: stats?.generated || 148,
            icon: MailCheck,
            color: "from-blue-500 to-cyan-400"
        },
        {
            title: "History Saved",
            value: stats?.history || 34,
            icon: History,
            color: "from-indigo-500 to-[#6C63FF]"
        },
        {
            title: "Custom Templates",
            value: stats?.templates || 12,
            icon: BookOpen,
            color: "from-purple-500 to-pink-500"
        },
        {
            title: "Emails Sent",
            value: stats?.sent || 89,
            icon: Send,
            color: "from-emerald-500 to-teal-500"
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 w-full">
            {cardData.map((card, idx) => {
                const Icon = card.icon;

                // Mouse 3D parallax coordinates
                const x = useMotionValue(0);
                const y = useMotionValue(0);
                const rotateX = useTransform(y, [-100, 100], [10, -10]);
                const rotateY = useTransform(x, [-100, 100], [-10, 10]);

                function handleMouse(event) {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const width = rect.width;
                    const height = rect.height;
                    const mouseX = event.clientX - rect.left - width / 2;
                    const mouseY = event.clientY - rect.top - height / 2;
                    x.set(mouseX);
                    y.set(mouseY);
                }

                function handleMouseLeave() {
                    x.set(0);
                    y.set(0);
                }

                return (
                    <motion.div
                        key={idx}
                        onMouseMove={handleMouse}
                        onMouseLeave={handleMouseLeave}
                        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="glass-panel rounded-3xl p-6 relative overflow-hidden bg-white/5 border border-white/10 shadow-xl cursor-default transition-shadow hover:shadow-[#6C63FF]/5"
                    >
                        {/* Reflected light element */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                        {/* Top layout: Icon and count */}
                        <div className="flex items-center justify-between">
                            <span className="text-[#AAB3C5] font-semibold text-sm font-display uppercase tracking-wider">
                                {card.title}
                            </span>
                            <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${card.color} flex items-center justify-center shadow-lg shadow-white/5`}>
                                <Icon size={20} className="text-white" />
                            </div>
                        </div>

                        {/* Counter Value */}
                        <div className="mt-6 flex items-baseline">
                            <span className="text-4xl font-heading font-bold text-white tracking-tight">
                                <Counter value={card.value} />
                            </span>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}

export default StatCards;
