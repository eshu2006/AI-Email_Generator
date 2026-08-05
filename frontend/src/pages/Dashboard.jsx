import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import DashboardHero from "../dashboard/DashboardHero";
import StatCards from "../dashboard/StatCards";
import EmailGenerator from "../email/EmailGenerator";
import EmailOutput from "../email/EmailOutput";
import LoadingScreen from "../email/LoadingScreen";
import HistoryDrawer from "../history/HistoryDrawer";
import TemplatesView from "../dashboard/TemplatesView";
import DraftsView from "../dashboard/DraftsView";
import AnalyticsView from "../analytics/AnalyticsView";
import SettingsView from "../settings/SettingsView";

import { AuthContext } from "../context/AuthContext";
import { generateEmail } from "../services/emailService";
import { getHistory } from "../services/historyService";

function Dashboard() {
    const navigate = useNavigate();
    const { user, logoutUser } = useContext(AuthContext);

    // Active tab and UI state
    const [activeTab, setActiveTab] = useState("dashboard");
    const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
    const [prefillData, setPrefillData] = useState(null);

    // Email generator state
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // History state
    const [history, setHistory] = useState([]);
    const [reloadHistory, setReloadHistory] = useState(false);

    // Search query passed to sub-views
    const [searchQuery, setSearchQuery] = useState("");

    // Load history from backend database
    const loadHistory = async () => {
        try {
            const data = await getHistory();
            setHistory(data);
        } catch (error) {
            console.error("Failed to load history:", error);
        }
    };

    useEffect(() => {
        loadHistory();
    }, [reloadHistory]);

    // Handle trigger of email generation
    const handleGenerate = async (params) => {
        setLoading(true);
        try {
            const response = await generateEmail(params);
            setEmail({
                ...response,
                recipient: params.recipient,
                purpose: params.purpose,
                tone: params.tone,
                length: params.length
            });
            // Trigger refresh of history drawer
            setReloadHistory(prev => !prev);
        } catch (error) {
            alert("Failed to generate email. Please make sure the backend is active.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logoutUser();
        navigate("/");
    };

    // Load templates or drafts into form
    const handleSelectTemplate = (template) => {
        setPrefillData({
            recipient: "",
            subject: template.title,
            purpose: template.purpose,
            tone: template.tone,
            length: template.length
        });
        setActiveTab("dashboard");
    };

    const handleSelectDraft = (draft) => {
        setPrefillData({
            recipient: draft.recipient,
            subject: draft.subject,
            purpose: draft.purpose,
            tone: draft.tone,
            length: draft.length
        });
        setEmail({
            subject: draft.subject,
            body: draft.body,
            recipient: draft.recipient
        });
        setActiveTab("dashboard");
    };

    // Load item from history drawer
    const handleLoadHistoryItem = (item) => {
        setPrefillData({
            recipient: item.recipient || "",
            subject: item.subject || "",
            purpose: item.purpose || "",
            tone: item.tone || "Professional",
            length: item.length || "Medium"
        });
        setEmail(item);
    };

    // Calculated metrics/stats for display
    const stats = {
        generated: history.length,
        history: history.length,
        templates: 6, // matching 6 hardcoded templates
        sent: Math.round(history.length * 0.75) // estimated send rate
    };

    // View router
    const renderActiveView = () => {
        switch (activeTab) {
            case "dashboard":
            case "generator":
                return (
                    <div className="space-y-8">
                        <DashboardHero userName={user?.name} />
                        <StatCards stats={stats} />
                        
                        {/* 40% / 60% grid composition */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            <div className="lg:col-span-5 w-full">
                                <EmailGenerator 
                                    onGenerate={handleGenerate} 
                                    loading={loading} 
                                    prefillData={prefillData}
                                />
                            </div>
                            <div className="lg:col-span-7 w-full h-full">
                                {loading ? (
                                    <LoadingScreen />
                                ) : (
                                    <EmailOutput 
                                        email={email} 
                                        setEmail={setEmail} 
                                        loading={loading} 
                                        onGenerate={handleGenerate} 
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                );
            case "templates":
                return <TemplatesView onSelectTemplate={handleSelectTemplate} />;
            case "drafts":
                return <DraftsView onSelectDraft={handleSelectDraft} />;
            case "analytics":
                return <AnalyticsView />;
            case "settings":
                return <SettingsView user={user} />;
            case "profile":
                return (
                    <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-8 bg-white/5 border border-white/10 text-left">
                        <h2 className="font-heading font-bold text-2xl text-white mb-6">User Profile</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-white/5 pb-3">
                                <span className="text-[#AAB3C5]">Full Name</span>
                                <span className="text-white font-semibold">{user?.name}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-3">
                                <span className="text-[#AAB3C5]">Email Address</span>
                                <span className="text-white font-semibold">{user?.email}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-3">
                                <span className="text-[#AAB3C5]">Member Status</span>
                                <span className="text-emerald-400 font-semibold">Active Pro Plan</span>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <div className="text-white text-lg">Work in progress...</div>;
        }
    };

    return (
        <MainLayout>
            <div className="flex min-h-screen relative w-full">
                {/* Collapsible Left Sidebar */}
                <Sidebar 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    user={user} 
                    onLogout={handleLogout}
                    toggleHistoryDrawer={() => setHistoryDrawerOpen(true)}
                />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0">
                    <Navbar 
                        user={user} 
                        onLogout={handleLogout} 
                        onSearch={setSearchQuery} 
                    />

                    {/* Dashboard Inner Scroll Area */}
                    <main className="flex-1 overflow-y-auto px-8 py-8 lg:px-12">
                        {renderActiveView()}
                    </main>
                </div>

                {/* Drawer opens on request */}
                <HistoryDrawer 
                    isOpen={historyDrawerOpen} 
                    onClose={() => setHistoryDrawerOpen(false)}
                    setEmail={handleLoadHistoryItem}
                    history={history}
                    onReload={() => setReloadHistory(prev => !prev)}
                />
            </div>
        </MainLayout>
    );
}

export default Dashboard;