import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "../services/authService";

function Signup() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setMessage("");

        try {

            const response = await signup(form);

            setMessage(response.message);

            setTimeout(() => {

                navigate("/");

            }, 1500);

        }

        catch (error) {

            setMessage(

                error.response?.data?.message ||

                "Signup Failed"

            );

        }

        setLoading(false);

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 flex justify-center items-center px-6">

            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

                <h1 className="text-4xl font-bold text-center text-white mb-2">

                    🤖 AI Email Generator

                </h1>

                <p className="text-center text-gray-300 mb-8">

                    Create Your Account

                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <input

                        type="text"

                        name="name"

                        placeholder="Full Name"

                        value={form.name}

                        onChange={handleChange}

                        className="w-full p-4 rounded-xl bg-slate-800 text-white placeholder-gray-400 outline-none"

                    />

                    <input

                        type="email"

                        name="email"

                        placeholder="Email"

                        value={form.email}

                        onChange={handleChange}

                        className="w-full p-4 rounded-xl bg-slate-800 text-white placeholder-gray-400 outline-none"

                    />

                    <input

                        type="password"

                        name="password"

                        placeholder="Password"

                        value={form.password}

                        onChange={handleChange}

                        className="w-full p-4 rounded-xl bg-slate-800 text-white placeholder-gray-400 outline-none"

                    />

                    {message && (

                        <p className="text-center text-red-400">

                            {message}

                        </p>

                    )}

                    <button

                        type="submit"

                        className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-4 text-white font-semibold"

                    >

                        {

                            loading ?

                            "Creating Account..."

                            :

                            "Create Account"

                        }

                    </button>

                </form>

                <p className="text-center text-gray-400 mt-6">

                    Already have an account?{" "}

                    <Link

                        to="/"

                        className="text-blue-400 hover:text-blue-300"

                    >

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Signup;