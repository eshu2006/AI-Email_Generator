import { useState } from "react";

import Navbar from "../components/Navbar";
import EmailForm from "../components/EmailForm";
import EmailOutput from "../components/EmailOutput";
import HistorySidebar from "../components/HistorySidebar";

function Dashboard() {

    const [email, setEmail] = useState(null);

    const [loading, setLoading] = useState(false);

    const [reloadHistory, setReloadHistory] = useState(false);

    return (

        <div className="min-h-screen bg-slate-950">

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="max-w-[1700px] mx-auto px-8 py-10 grid grid-cols-12 gap-8">

                <div className="col-span-3">

                    <HistorySidebar
                        setEmail={setEmail}
                        reloadHistory={reloadHistory}
                    />

                </div>

                <div className="col-span-4">

                    <EmailForm
                        setEmail={setEmail}
                        loading={loading}
                        setLoading={setLoading}
                        setReloadHistory={setReloadHistory}
                    />

                </div>

                <div className="col-span-5">

                    <EmailOutput
                        email={email}
                        loading={loading}
                    />

                </div>

            </div>

        </div>

    );

}

export default Dashboard;