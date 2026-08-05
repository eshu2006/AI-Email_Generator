import React from "react";

function MainLayout({ children }) {
    return (
        <div className="min-h-screen w-full relative text-white bg-[#050816] selection:bg-[#6C63FF]/30 selection:text-white">
            {/* Animated Aurora Background */}
            <div className="aurora-bg">
                <div className="aurora-blob aurora-blob-1"></div>
                <div className="aurora-blob aurora-blob-2"></div>
                <div className="aurora-blob aurora-blob-3"></div>
            </div>

            {/* Grid Lines Overlay */}
            <div className="grid-overlay"></div>

            {/* SVG/CSS Noise Overlay */}
            <div className="noise-overlay"></div>

            {/* Main Application Container */}
            <div className="relative z-10 w-full min-h-screen flex flex-col">
                {children}
            </div>
        </div>
    );
}

export default MainLayout;
