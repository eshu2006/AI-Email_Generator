import React from "react";
import { motion } from "framer-motion";
import { Sparkles, FileText, CheckCircle, ArrowRight } from "lucide-react";

function TemplatesView({ onSelectTemplate }) {
    const templates = [
        {
            title: "Cold Sales Outreach",
            desc: "Introduce your product or service to a prospect persuasively.",
            purpose: "Introduce our premium cloud hosting services to the CTO, offering a 14-day free trial and highlight 99.99% uptime.",
            tone: "Convincing",
            length: "Medium"
        },
        {
            title: "Meeting Request",
            desc: "Schedule a synchronizing call or project feedback session.",
            purpose: "Request a 15-minute alignment call with the product manager next Tuesday to discuss feedback on design prototypes.",
            tone: "Professional",
            length: "Short"
        },
        {
            title: "Follow-up Draft",
            desc: "Check in on a previously sent email without being pushy.",
            purpose: "Follow up on the partnership proposal sent last week. Ask if they had time to review the materials and want to talk.",
            tone: "Friendly",
            length: "Short"
        },
        {
            title: "Job Application Cover",
            desc: "Send a resume and summarize your alignment to a role.",
            purpose: "Apply for the Senior React Developer role, highlighting 5 years of experience, expertise in Tailwind and Framer Motion.",
            tone: "Formal",
            length: "Long"
        },
        {
            title: "Project Progress Report",
            desc: "Update stakeholders on project milestones and blockers.",
            purpose: "Send weekly progress report to the client. Milestones met: database optimization, auth system refactoring. Blockers: None.",
            tone: "Professional",
            length: "Medium"
        },
        {
            title: "Urgent Notification",
            desc: "Alert users about an issue or upcoming scheduled maintenance.",
            purpose: "Alert clients about scheduled database maintenance next Sunday between 2:00 AM and 4:00 AM UTC. Downtime expected: 15 mins.",
            tone: "Urgent",
            length: "Short"
        }
    ];

    return (
        <div className="w-full text-left">
            <div className="mb-8">
                <h2 className="font-heading font-bold text-3xl text-white">Email Templates</h2>
                <p className="text-[#AAB3C5] mt-1 text-sm">Select a starter template to pre-populate the AI composer parameters.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((tpl, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        whileHover={{ y: -6 }}
                        className="glass-panel rounded-3xl p-6 bg-white/5 border border-white/10 hover:border-[#6C63FF]/30 transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/10 border border-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF] mb-4">
                                <FileText size={18} />
                            </div>
                            <h3 className="font-heading font-bold text-lg text-white mb-2">{tpl.title}</h3>
                            <p className="text-xs text-[#AAB3C5] leading-relaxed mb-6">{tpl.desc}</p>
                        </div>

                        <button
                            onClick={() => onSelectTemplate(tpl)}
                            className="w-full py-2.5 rounded-xl border border-white/10 hover:bg-[#6C63FF] hover:border-[#6C63FF] transition duration-300 text-xs font-bold text-white flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            <span>Use Template</span>
                            <ArrowRight size={12} />
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default TemplatesView;
