import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Rocket, Sparkles, AlertCircle } from "lucide-react";

function EmailGenerator({ onGenerate, loading, prefillData }) {
    const [form, setForm] = useState({
        recipient: "",
        subject: "", // Extra field mapped to purpose
        purpose: "",
        tone: "Professional",
        length: "Medium",
        language: "English", // Extra field mapped to purpose
        signatureToggle: true, // Extra field mapped to purpose
        priority: "Medium", // Extra field mapped to purpose
        additionalInstructions: "" // Extra field mapped to purpose
    });

    useEffect(() => {
        if (prefillData) {
            setForm({
                recipient: prefillData.recipient || "",
                subject: prefillData.subject || "",
                purpose: prefillData.purpose || "",
                tone: prefillData.tone || "Professional",
                length: prefillData.length || "Medium",
                language: prefillData.language || "English",
                signatureToggle: prefillData.signatureToggle !== undefined ? prefillData.signatureToggle : true,
                priority: prefillData.priority || "Medium",
                additionalInstructions: prefillData.additionalInstructions || ""
            });
        }
    }, [prefillData]);

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.recipient.trim()) {
            setError("Recipient email or name is required");
            return;
        }
        if (!form.purpose.trim()) {
            setError("Email purpose is required");
            return;
        }

        // Bundle additional fields into backend 'purpose' without changing backend API
        const formattedPurpose = `
Purpose: ${form.purpose}
${form.subject ? `Target Subject Line Concept: ${form.subject}` : ""}
Language: ${form.language}
Priority: ${form.priority}
Include Professional Signature/Sign-off: ${form.signatureToggle ? "Yes" : "No"}
${form.additionalInstructions ? `Extra constraints: ${form.additionalInstructions}` : ""}
`.trim();

        const payload = {
            recipient: form.recipient,
            purpose: formattedPurpose,
            tone: form.tone,
            length: form.length
        };

        try {
            await onGenerate(payload);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full text-left glass-panel rounded-3xl p-6 lg:p-8 bg-white/5 border border-white/10 relative shadow-2xl"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#6C63FF]/20 flex items-center justify-center text-[#6C63FF]">
                    <Sparkles size={16} />
                </div>
                <h2 className="font-heading font-bold text-2xl text-white tracking-tight">
                    Compose Parameters
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-400">
                        <AlertCircle size={14} className="shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Recipient */}
                <div className="relative group">
                    <input
                        type="text"
                        name="recipient"
                        id="recipient"
                        placeholder=" "
                        value={form.recipient}
                        onChange={handleChange}
                        className="peer w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-transparent focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF]/30 transition-all duration-300 text-sm"
                    />
                    <label 
                        htmlFor="recipient" 
                        className="absolute left-4 top-3 text-xs text-[#AAB3C5] transition-all duration-300 transform -translate-y-7 scale-95 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-95 peer-focus:text-[#6C63FF] pointer-events-none"
                    >
                        Recipient (e.g. John Doe, hr@company.com)
                    </label>
                </div>

                {/* Subject Line Concept */}
                <div className="relative group">
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        placeholder=" "
                        value={form.subject}
                        onChange={handleChange}
                        className="peer w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-transparent focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF]/30 transition-all duration-300 text-sm"
                    />
                    <label 
                        htmlFor="subject" 
                        className="absolute left-4 top-3 text-xs text-[#AAB3C5] transition-all duration-300 transform -translate-y-7 scale-95 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-95 peer-focus:text-[#6C63FF] pointer-events-none"
                    >
                        Subject Concept / Context (Optional)
                    </label>
                </div>

                {/* Core Purpose */}
                <div className="relative group">
                    <textarea
                        name="purpose"
                        id="purpose"
                        rows="4"
                        placeholder=" "
                        value={form.purpose}
                        onChange={handleChange}
                        className="peer w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-transparent focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF]/30 transition-all duration-300 text-sm resize-none"
                    />
                    <label 
                        htmlFor="purpose" 
                        className="absolute left-4 top-3.5 text-xs text-[#AAB3C5] transition-all duration-300 transform -translate-y-7 scale-95 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-95 peer-focus:text-[#6C63FF] pointer-events-none"
                    >
                        Core message & details (What is this email about?)
                    </label>
                </div>

                {/* Dropdowns row 1: Tone & Length */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col text-left">
                        <label className="text-xs text-[#AAB3C5] font-semibold mb-1.5 ml-1">Tone</label>
                        <select
                            name="tone"
                            value={form.tone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-2xl bg-[#0F172A] border border-white/10 text-white focus:outline-none focus:border-[#6C63FF] transition duration-300 text-sm"
                        >
                            <option>Professional</option>
                            <option>Friendly</option>
                            <option>Formal</option>
                            <option>Convincing</option>
                            <option>Urgent</option>
                            <option>Casual</option>
                        </select>
                    </div>

                    <div className="flex flex-col text-left">
                        <label className="text-xs text-[#AAB3C5] font-semibold mb-1.5 ml-1">Length</label>
                        <select
                            name="length"
                            value={form.length}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-2xl bg-[#0F172A] border border-white/10 text-white focus:outline-none focus:border-[#6C63FF] transition duration-300 text-sm"
                        >
                            <option>Short</option>
                            <option>Medium</option>
                            <option>Long</option>
                        </select>
                    </div>
                </div>

                {/* Dropdowns row 2: Language & Priority */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col text-left">
                        <label className="text-xs text-[#AAB3C5] font-semibold mb-1.5 ml-1">Language</label>
                        <select
                            name="language"
                            value={form.language}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-2xl bg-[#0F172A] border border-white/10 text-white focus:outline-none focus:border-[#6C63FF] transition duration-300 text-sm"
                        >
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                            <option>Hindi</option>
                        </select>
                    </div>

                    <div className="flex flex-col text-left">
                        <label className="text-xs text-[#AAB3C5] font-semibold mb-1.5 ml-1">Priority</label>
                        <select
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-2xl bg-[#0F172A] border border-white/10 text-white focus:outline-none focus:border-[#6C63FF] transition duration-300 text-sm"
                        >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </select>
                    </div>
                </div>

                {/* Signature Toggle */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-sm font-medium text-white">Include Sign-off / Signature</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                            type="checkbox" 
                            name="signatureToggle"
                            checked={form.signatureToggle}
                            onChange={handleChange}
                            className="sr-only peer" 
                        />
                        <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#AAB3C5] after:border-gray-300 after:border after:rounded-full after:height-5 after:width-5 after:transition-all peer-checked:bg-[#6C63FF] peer-checked:after:bg-white"></div>
                    </label>
                </div>

                {/* Additional Instructions */}
                <div className="relative group">
                    <input
                        type="text"
                        name="additionalInstructions"
                        id="additionalInstructions"
                        placeholder=" "
                        value={form.additionalInstructions}
                        onChange={handleChange}
                        className="peer w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-transparent focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF]/30 transition-all duration-300 text-sm"
                    />
                    <label 
                        htmlFor="additionalInstructions" 
                        className="absolute left-4 top-3 text-xs text-[#AAB3C5] transition-all duration-300 transform -translate-y-7 scale-95 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7 peer-focus:scale-95 peer-focus:text-[#6C63FF] pointer-events-none"
                    >
                        Extra instructions (e.g. mention refund policy)
                    </label>
                </div>

                {/* Generate Button */}
                <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold bg-gradient-to-r from-blue-600 to-[#6C63FF] text-white cursor-pointer shadow-lg shadow-[#6C63FF]/25 hover:shadow-[#6C63FF]/45 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Rocket size={18} className={`${loading ? "animate-bounce" : ""}`} />
                    <span>{loading ? "AI Hashing Thoughts..." : "Generate AI Email"}</span>
                </motion.button>
            </form>
        </motion.div>
    );
}

export default EmailGenerator;
