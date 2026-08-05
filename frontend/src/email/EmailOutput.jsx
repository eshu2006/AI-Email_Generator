import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jsPDF from "jspdf";
import { 
    Copy, 
    Check, 
    FileText, 
    FileSpreadsheet, 
    Sparkles, 
    Printer, 
    Maximize2, 
    Minimize2, 
    Edit3, 
    Mail, 
    Send, 
    ChevronDown, 
    RefreshCcw,
    Globe,
    Share2,
    Save,
    X
} from "lucide-react";

function EmailOutput({ email, setEmail, loading, onGenerate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedSubject, setEditedSubject] = useState("");
    const [editedBody, setEditedBody] = useState("");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    const printRef = useRef(null);

    useEffect(() => {
        if (email) {
            setEditedSubject(email.subject);
            setEditedBody(email.body);
            setIsEditing(false);
        }
    }, [email]);

    const handleCopy = () => {
        if (!email) return;
        navigator.clipboard.writeText(editedBody);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    const handleDownloadPDF = () => {
        if (!email) return;
        const pdf = new jsPDF();
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(18);
        pdf.text(editedSubject, 10, 20);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
        const lines = pdf.splitTextToSize(editedBody, 180);
        pdf.text(lines, 10, 35);
        pdf.save(`${editedSubject.replace(/[^a-z0-9]/gi, '_').toLowerCase() || "email"}.pdf`);
    };

    const handleDownloadTXT = () => {
        if (!email) return;
        const element = document.createElement("a");
        const file = new Blob([`Subject: ${editedSubject}\n\n${editedBody}`], { type: 'text/plain;charset=utf-8' });
        element.href = URL.createObjectURL(file);
        const safeSubject = editedSubject.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        element.download = `${safeSubject || "email"}.txt`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const handleSendGmail = () => {
        if (!email) return;
        const recipient = email.recipient || "";
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(editedSubject)}&body=${encodeURIComponent(editedBody)}`;
        window.open(gmailUrl, "_blank");
    };

    const handleSendOutlook = () => {
        if (!email) return;
        const recipient = email.recipient || "";
        const outlookUrl = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${encodeURIComponent(recipient)}&subject=${encodeURIComponent(editedSubject)}&body=${encodeURIComponent(editedBody)}`;
        window.open(outlookUrl, "_blank");
    };

    const handleSendDefault = () => {
        if (!email) return;
        const recipient = email.recipient || "";
        const mailto = `mailto:${recipient}?subject=${encodeURIComponent(editedSubject)}&body=${encodeURIComponent(editedBody)}`;
        window.location.href = mailto;
    };

    const handleRegenerate = () => {
        if (!email) return;
        onGenerate({
            recipient: email.recipient,
            purpose: email.purpose,
            tone: email.tone,
            length: email.length
        });
    };

    const handleSaveEdit = () => {
        setEmail({
            ...email,
            subject: editedSubject,
            body: editedBody
        });
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedSubject(email.subject);
        setEditedBody(email.body);
        setIsEditing(false);
    };

    const handlePrint = () => {
        const printContent = printRef.current ? printRef.current.innerHTML : "";
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload(); // Reload to restore React bindings
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: editedSubject,
                text: editedBody,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(`Subject: ${editedSubject}\n\n${editedBody}`);
            alert("📋 Shared! Copied complete email copy to clipboard.");
        }
    };

    const contentArea = (
        <div 
            ref={printRef}
            className="w-full bg-[#0F172A]/70 border border-white/5 rounded-2xl p-6 lg:p-8 flex-1 flex flex-col justify-between min-h-[380px]"
        >
            <div>
                {/* Header: To/Subject fields resembling Gmail */}
                <div className="space-y-2.5 pb-4 border-b border-white/5 text-left text-xs lg:text-sm text-[#AAB3C5]">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold w-14 shrink-0">From:</span>
                        <span className="text-white bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">AI Assistant &lt;assistant@antigravity.ai&gt;</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold w-14 shrink-0">To:</span>
                        <span className="text-white">{email?.recipient || "Undisclosed Recipient"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold w-14 shrink-0">Subject:</span>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedSubject}
                                onChange={(e) => setEditedSubject(e.target.value)}
                                className="w-full bg-slate-800 text-white rounded-lg px-3 py-1 font-semibold border border-slate-700 focus:outline-none focus:border-[#6C63FF] text-xs lg:text-sm"
                            />
                        ) : (
                            <span className="text-[#6C63FF] font-semibold">{editedSubject || "No Subject"}</span>
                        )}
                    </div>
                </div>

                {/* Body Content */}
                <div className="pt-6 text-left text-sm lg:text-base leading-relaxed text-slate-200">
                    {isEditing ? (
                        <textarea
                            rows="12"
                            value={editedBody}
                            onChange={(e) => setEditedBody(e.target.value)}
                            className="w-full bg-slate-800 text-white rounded-xl p-4 font-mono text-xs lg:text-sm leading-relaxed border border-slate-700 focus:outline-none focus:border-[#6C63FF] resize-none"
                        />
                    ) : (
                        <pre className="whitespace-pre-wrap font-sans text-slate-300 leading-relaxed text-sm lg:text-[15px]">
                            {editedBody || "Your generated email text goes here..."}
                        </pre>
                    )}
                </div>
            </div>

            {/* Bottom Actions for Edit State */}
            {isEditing && (
                <div className="mt-6 flex justify-end gap-3 pt-6 border-t border-white/5">
                    <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 transition flex items-center gap-2 text-xs font-semibold cursor-pointer"
                    >
                        <X size={14} /> Cancel
                    </button>
                    <button
                        onClick={handleSaveEdit}
                        className="px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white transition flex items-center gap-2 text-xs font-semibold cursor-pointer shadow-lg shadow-green-950/20"
                    >
                        <Save size={14} /> Save Changes
                    </button>
                </div>
            )}
        </div>
    );

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="w-full text-left glass-panel rounded-3xl p-6 lg:p-8 bg-white/5 border border-white/10 flex flex-col h-full shadow-2xl relative"
            >
                {/* Headline / Title */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                            <Mail size={16} />
                        </div>
                        <h2 className="font-heading font-bold text-2xl text-white tracking-tight">
                            Generated Output
                        </h2>
                    </div>

                    {email && !isEditing && (
                        <div className="flex items-center gap-1.5">
                            {/* Fullscreen Button */}
                            <button
                                onClick={() => setIsFullscreen(true)}
                                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition text-[#AAB3C5] hover:text-white cursor-pointer"
                                title="Fullscreen"
                            >
                                <Maximize2 size={14} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Toolbar */}
                {email && !isEditing && (
                    <div className="flex flex-wrap gap-2 mb-4 p-2.5 rounded-2xl bg-white/5 border border-white/5">
                        {/* Core Operations */}
                        <div className="flex flex-wrap gap-1.5 w-full justify-between items-center">
                            <div className="flex flex-wrap gap-1.5">
                                <button
                                    onClick={handleCopy}
                                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer border border-white/5"
                                >
                                    {copySuccess ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                                    <span>{copySuccess ? "Copied" : "Copy"}</span>
                                </button>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer border border-white/5"
                                >
                                    <Edit3 size={13} />
                                    <span>Edit</span>
                                </button>
                                <button
                                    onClick={handleRegenerate}
                                    className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer border border-white/5"
                                >
                                    <RefreshCcw size={13} />
                                    <span>Regen</span>
                                </button>
                            </div>

                            {/* Export tools */}
                            <div className="flex flex-wrap gap-1.5">
                                <button
                                    onClick={handleDownloadPDF}
                                    className="p-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 transition cursor-pointer"
                                    title="Export PDF"
                                >
                                    <FileText size={14} />
                                </button>
                                <button
                                    onClick={handleDownloadTXT}
                                    className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 transition cursor-pointer"
                                    title="Export TXT"
                                >
                                    <FileSpreadsheet size={14} />
                                </button>
                                <button
                                    onClick={handlePrint}
                                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition cursor-pointer"
                                    title="Print Email"
                                >
                                    <Printer size={14} />
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 transition cursor-pointer"
                                    title="Share Copy"
                                >
                                    <Share2 size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Integration buttons (Gmail, Outlook, Default Mailto) */}
                        <div className="grid grid-cols-3 gap-2 w-full mt-1.5 pt-2.5 border-t border-white/5">
                            <button
                                onClick={handleSendGmail}
                                className="py-2.5 rounded-xl bg-red-600/15 hover:bg-red-600/25 border border-red-600/25 text-red-400 flex items-center justify-center gap-1.5 text-xs font-bold transition cursor-pointer shadow-lg shadow-red-950/10"
                            >
                                <Send size={12} /> Gmail
                            </button>
                            <button
                                onClick={handleSendOutlook}
                                className="py-2.5 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 border border-blue-600/25 text-blue-400 flex items-center justify-center gap-1.5 text-xs font-bold transition cursor-pointer shadow-lg shadow-blue-950/10"
                            >
                                <Globe size={12} /> Outlook
                            </button>
                            <button
                                onClick={handleSendDefault}
                                className="py-2.5 rounded-xl bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-600/25 text-indigo-400 flex items-center justify-center gap-1.5 text-xs font-bold transition cursor-pointer shadow-lg shadow-indigo-950/10"
                            >
                                <Mail size={12} /> Default
                            </button>
                        </div>
                    </div>
                )}

                {/* Body/Output Container */}
                <div className="flex-1 flex flex-col justify-center">
                    {email ? (
                        contentArea
                    ) : (
                        <div className="py-16 text-center">
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mx-auto mb-4 text-[#AAB3C5]">
                                <Sparkles size={24} />
                            </div>
                            <p className="text-[#AAB3C5] text-sm">
                                Configure parameters on the left and click generate to create your AI email copy.
                            </p>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Fullscreen Modal View */}
            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-6 lg:p-12 text-left"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 15 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 15 }}
                            className="w-full max-w-4xl bg-[#050816] border border-white/10 rounded-3xl p-6 lg:p-8 flex flex-col h-[90vh] shadow-2xl relative"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-heading font-bold text-xl text-white">Fullscreen Preview</h3>
                                <button
                                    onClick={() => setIsFullscreen(false)}
                                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition cursor-pointer"
                                >
                                    <Minimize2 size={16} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto pr-1">
                                {contentArea}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default EmailOutput;
