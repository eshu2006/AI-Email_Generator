import React from "react";
import { motion } from "framer-motion";
import { FolderOpen, Edit3, ArrowRight, Trash2 } from "lucide-react";

function DraftsView({ onSelectDraft }) {
    const drafts = [
        {
            title: "Newsletter Pitch draft",
            recipient: "newsletter-partners@media.com",
            purpose: "Draft a collaborative newsletter pitch proposing cross-promotion.",
            tone: "Friendly",
            length: "Medium",
            subject: "Collaboration Opportunity: Cross-promotion newsletter",
            body: "Hi team,\n\nI hope you're having an excellent week.\n\nI'm writing from Antigravity to check if you would be open to a cross-newsletter swap next month? We have over 10k active subscribers in the tech SaaS space.\n\nLet me know your thoughts.\n\nRegards,\nRavinder"
        },
        {
            title: "Refund Issue explanation",
            recipient: "billing@vendor.io",
            purpose: "Request explanation for double charging on invoice #9403.",
            tone: "Professional",
            length: "Short",
            subject: "Inquiry: Double charge on invoice #9403",
            body: "Hi Support,\n\nIt looks like my account was charged twice for the billing cycle of July 2026. \n\nCould you please look into this and process a refund for the duplicate transaction?\n\nRegards,\nRavinder"
        }
    ];

    return (
        <div className="w-full text-left">
            <div className="mb-8">
                <h2 className="font-heading font-bold text-3xl text-white">Drafts Vault</h2>
                <p className="text-[#AAB3C5] mt-1 text-sm">Pick up where you left off. Review and edit your unsaved drafts.</p>
            </div>

            {drafts.length === 0 ? (
                <div className="py-20 text-center text-[#AAB3C5] text-sm glass-panel rounded-3xl p-8">
                    No drafts currently saved.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {drafts.map((draft, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            className="glass-panel rounded-3xl p-6 bg-white/5 border border-white/10 hover:border-[#6C63FF]/30 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                                        <FolderOpen size={18} />
                                    </div>
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#AAB3C5] bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                                        Draft
                                    </span>
                                </div>
                                <h3 className="font-heading font-bold text-lg text-white mb-1 truncate">{draft.title}</h3>
                                <p className="text-xs text-[#AAB3C5] mb-2 truncate">To: {draft.recipient}</p>
                                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-6 border-t border-white/5 pt-3">
                                    {draft.body}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => onSelectDraft(draft)}
                                    className="flex-1 py-2.5 rounded-xl bg-[#6C63FF]/20 hover:bg-[#6C63FF] transition duration-300 text-xs font-bold text-white flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    <Edit3 size={12} />
                                    <span>Open in Editor</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DraftsView;
