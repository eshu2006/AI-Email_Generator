import { useEffect, useState } from "react";

import { getHistory } from "../services/historyService";

function HistorySidebar({

setEmail,

reloadHistory

}) {

    const [history, setHistory] = useState([]);

    useEffect(() => {

loadHistory();

}, [reloadHistory]);

    const loadHistory = async () => {

        try {

            const data = await getHistory();

            setHistory(data);

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-6 h-[700px] overflow-y-auto">

            <h2 className="text-2xl font-bold text-white mb-6">

                📜 Email History

            </h2>

            {

                history.length === 0 ?

                (

                    <p className="text-gray-400">

                        No emails generated yet.

                    </p>

                )

                :

                history.map((item, index) => (

                    <div

                        key={index}

                        onClick={() => setEmail(item)}

                        className="bg-slate-900 hover:bg-slate-800 cursor-pointer rounded-xl p-4 mb-4 transition"

                    >

                        <h3 className="text-blue-400 font-bold">

                            {item.subject}

                        </h3>

                        <p className="text-gray-400 text-sm mt-2">

                            {item.recipient}

                        </p>

                        <p className="text-gray-500 text-xs mt-2">

                            {item.created_at}

                        </p>

                    </div>

                ))

            }

        </div>

    );

}

export default HistorySidebar;