import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {

    const navigate = useNavigate();

    const { user, logoutUser } = useContext(AuthContext);

    const handleLogout = () => {

        logoutUser();

        navigate("/");

    };

    return (

        <nav className="border-b border-white/10 bg-slate-900/70 backdrop-blur-lg">

            <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

                <h1 className="text-3xl font-bold text-white">

                    🤖 AI Email Generator

                </h1>

                <div className="flex items-center gap-6">

                    <p className="text-white">

                        👤 {user?.name}

                    </p>

                    <button

                        onClick={handleLogout}

                        className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl text-white"

                    >

                        Logout

                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;