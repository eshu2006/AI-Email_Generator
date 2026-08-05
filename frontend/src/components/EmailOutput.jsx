import { useState, useEffect } from "react";
import Loading from "./Loading";
import jsPDF from "jspdf";
import { 
    FaGoogle, 
    FaEnvelope, 
    FaCopy, 
    FaFilePdf, 
    FaFileDownload, 
    FaSyncAlt, 
    FaEdit, 
    FaCheck, 
    FaTimes 
} from "react-icons/fa";

function EmailOutput({ email, setEmail, loading, onGenerate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedSubject, setEditedSubject] = useState("");
    const [editedBody, setEditedBody] = useState("");

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
        alert("📋 Copied email body to clipboard!");
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
        pdf.save("Generated_Email.pdf");
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

    return (
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-6">
                Generated Email
            </h2>

            <div className="bg-slate-900 rounded-2xl p-6 min-h-[420px] flex flex-col justify-between border border-white/5">
                {loading ? (
                    <div className="flex-1 flex justify-center items-center">
                        <Loading />
                    </div>
                ) : email ? (
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            {isEditing ? (
                                <div className="mb-4">
                                    <label className="block text-gray-400 text-xs font-semibold uppercase mb-1">Subject</label>
                                    <input
                                        type="text"
                                        value={editedSubject}
                                        onChange={(e) => setEditedSubject(e.target.value)}
                                        className="w-full bg-slate-800 text-white rounded-xl p-3 font-bold border border-slate-700 focus:border-blue-500 focus:outline-none transition"
                                    />
                                </div>
                            ) : (
                                <h3 className="text-blue-400 text-2xl font-bold tracking-tight">
                                    {email.subject}
                                </h3>
                            )}

                            <hr className="my-4 border-slate-700" />

                            {isEditing ? (
                                <div>
                                    <label className="block text-gray-400 text-xs font-semibold uppercase mb-1">Body</label>
                                    <textarea
                                        rows="10"
                                        value={editedBody}
                                        onChange={(e) => setEditedBody(e.target.value)}
                                        className="w-full bg-slate-800 text-gray-100 rounded-xl p-4 font-mono text-sm leading-6 border border-slate-700 focus:border-blue-500 focus:outline-none transition resize-none"
                                    />
                                </div>
                            ) : (
                                <pre className="text-gray-300 whitespace-pre-wrap leading-7 font-sans text-[15px]">
                                    {email.body}
                                </pre>
                            )}
                        </div>

                        {/* Action Buttons Section */}
                        {!isEditing && (
                            <div className="mt-8 border-t border-slate-800 pt-6 space-y-4">
                                {/* Send Actions */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <button
                                        onClick={handleSendGmail}
                                        className="bg-red-600 hover:bg-red-700 active:scale-95 transition-all px-6 py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 cursor-pointer text-center"
                                    >
                                        <FaGoogle className="text-lg" /> Send with Gmail
                                    </button>
                                    <button
                                        onClick={handleSendDefault}
                                        className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all px-6 py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 cursor-pointer text-center"
                                    >
                                        <FaEnvelope className="text-lg" /> Send with Default Mail
                                    </button>
                                </div>

                                {/* Manage & Utility Actions */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-700 font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button
                                        onClick={handleRegenerate}
                                        className="bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-700 font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
                                    >
                                        <FaSyncAlt /> Regenerate
                                    </button>
                                    <button
                                        onClick={handleCopy}
                                        className="bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-700 font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition col-span-2 sm:col-span-1 cursor-pointer"
                                    >
                                        <FaCopy /> Copy Body
                                    </button>
                                    <button
                                        onClick={handleDownloadPDF}
                                        className="bg-purple-900/30 hover:bg-purple-900/50 text-purple-200 border border-purple-800/50 font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
                                    >
                                        <FaFilePdf /> PDF
                                    </button>
                                    <button
                                        onClick={handleDownloadTXT}
                                        className="bg-teal-900/30 hover:bg-teal-900/50 text-teal-200 border border-teal-800/50 font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
                                    >
                                        <FaFileDownload /> Text File
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Save / Cancel Edit Actions */}
                        {isEditing && (
                            <div className="mt-6 flex justify-end gap-3 border-t border-slate-800 pt-6">
                                <button
                                    onClick={handleCancelEdit}
                                    className="bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700 px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition cursor-pointer"
                                >
                                    <FaTimes /> Cancel
                                </button>
                                <button
                                    onClick={handleSaveEdit}
                                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 transition shadow-lg shadow-green-900/20 cursor-pointer"
                                >
                                    <FaCheck /> Save Changes
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex-1 flex justify-center items-center h-full">
                        <p className="text-gray-400 text-lg">
                            🤖 Your AI generated email will appear here.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmailOutput;