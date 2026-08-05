import React, { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Save, ShieldAlert, Cpu, Sparkles, User } from "lucide-react";

function SettingsView({ user }) {
    const [settingsForm, setSettingsForm] = useState({
        defaultModel: "gemini-2.5-flash",
        defaultTone: "Professional",
        signatureText: `Regards,\n${user?.name || "Ravinder"}`,
        autoCopy: true,
        highContrast: false,
    });

    const [saved, setSaved] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="w-full text-left">
            <div className="mb-8">
                <h2 className="font-heading font-bold text-3xl text-white">System Settings</h2>
                <p className="text-[#AAB3C5] mt-1 text-sm">Manage model parameters, sign-offs, and defaults.</p>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left column settings */}
                <div className="lg:col-span-2 space-y-6">
                    {/* General Settings */}
                    <div className="glass-panel rounded-3xl p-6 lg:p-8 bg-white/5 border border-white/10 space-y-5">
                        <h3 className="font-heading font-bold text-lg text-white mb-4 flex items-center gap-2">
                            <Cpu size={18} className="text-[#6C63FF]" />
                            <span>AI Configuration</span>
                        </h3>

                        {/* Dropdowns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <label className="text-xs text-[#AAB3C5] font-semibold mb-1.5 ml-1">Default AI Engine</label>
                                <select
                                    value={settingsForm.defaultModel}
                                    onChange={(e) => setSettingsForm({ ...settingsForm, defaultModel: e.target.value })}
                                    className="px-4 py-3 rounded-2xl bg-[#0F172A] border border-white/10 text-white focus:outline-none focus:border-[#6C63FF] transition duration-300 text-sm"
                                >
                                    <option value="gemini-2.5-flash">Gemini 2.5 Flash (Default)</option>
                                    <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
                                    <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-xs text-[#AAB3C5] font-semibold mb-1.5 ml-1">Default Compose Tone</label>
                                <select
                                    value={settingsForm.defaultTone}
                                    onChange={(e) => setSettingsForm({ ...settingsForm, defaultTone: e.target.value })}
                                    className="px-4 py-3 rounded-2xl bg-[#0F172A] border border-white/10 text-white focus:outline-none focus:border-[#6C63FF] transition duration-300 text-sm"
                                >
                                    <option>Professional</option>
                                    <option>Friendly</option>
                                    <option>Formal</option>
                                </select>
                            </div>
                        </div>

                        {/* Signature Text Area */}
                        <div className="flex flex-col">
                            <label className="text-xs text-[#AAB3C5] font-semibold mb-1.5 ml-1">Default Signature/Sign-off</label>
                            <textarea
                                rows="3"
                                value={settingsForm.signatureText}
                                onChange={(e) => setSettingsForm({ ...settingsForm, signatureText: e.target.value })}
                                className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#6C63FF] transition duration-300 text-sm resize-none font-mono"
                            />
                        </div>
                    </div>

                    {/* Automation & UI Options */}
                    <div className="glass-panel rounded-3xl p-6 lg:p-8 bg-white/5 border border-white/10 space-y-4">
                        <h3 className="font-heading font-bold text-lg text-white mb-4 flex items-center gap-2">
                            <Sparkles size={18} className="text-[#6C63FF]" />
                            <span>Preferences & Automations</span>
                        </h3>

                        {/* Toggles */}
                        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/5">
                            <div>
                                <p className="text-sm font-semibold text-white">Auto-copy to Clipboard</p>
                                <p className="text-xs text-[#AAB3C5]">Automatically copy generated text on completion</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settingsForm.autoCopy}
                                    onChange={(e) => setSettingsForm({ ...settingsForm, autoCopy: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#AAB3C5] after:border-gray-300 after:border after:rounded-full after:height-5 after:width-5 after:transition-all peer-checked:bg-[#6C63FF] peer-checked:after:bg-white"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Right side settings column */}
                <div className="space-y-6">
                    {/* User profile config info */}
                    <div className="glass-panel rounded-3xl p-6 bg-white/5 border border-white/10 text-center flex flex-col items-center">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#6C63FF] to-blue-500 flex items-center justify-center text-white text-3xl font-display font-bold shadow-xl shadow-[#6C63FF]/20 mb-4">
                            {user?.name ? user.name[0].toUpperCase() : "U"}
                        </div>
                        <h4 className="font-heading font-bold text-lg text-white">{user?.name || "Ravinder"}</h4>
                        <p className="text-xs text-[#AAB3C5]">{user?.email || "user@antigravity.io"}</p>
                        
                        <div className="w-full mt-6 pt-6 border-t border-white/5 space-y-2 text-xs text-left">
                            <div className="flex justify-between">
                                <span className="text-[#AAB3C5]">Account Type</span>
                                <span className="text-[#6C63FF] font-semibold">Pro SaaS Account</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#AAB3C5]">Renewal Date</span>
                                <span className="text-white">Sep 05, 2026</span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 rounded-2xl font-bold bg-[#6C63FF] text-white cursor-pointer shadow-lg shadow-[#6C63FF]/25 flex items-center justify-center gap-2"
                    >
                        <Save size={18} />
                        <span>{saved ? "Settings Saved!" : "Save Changes"}</span>
                    </motion.button>
                </div>
            </form>
        </div>
    );
}

export default SettingsView;
