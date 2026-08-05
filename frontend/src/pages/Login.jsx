import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle } from "lucide-react";

import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import MainLayout from "../layout/MainLayout";

function Login() {
    const navigate = useNavigate();
    const { loginUser } = useContext(AuthContext);

    const [form, setForm] = useState({
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

        if (!form.email || !form.password) {
            setMessage("Please enter both email and password");
            setLoading(false);
            return;
        }

        try {
            const response = await login(form);
            loginUser(response);
            navigate("/dashboard");
        } catch (error) {
            setMessage(
                error.response?.data?.detail ||
                error.response?.data?.message ||
                "Login Failed. Please verify your credentials."
            );
        }
        setLoading(false);
    };

    return (
        <MainLayout>
            <div className="min-h-screen w-full flex items-center justify-center px-6 py-12 relative">
                {/* Visual Ambient Globs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6C63FF]/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-[440px] glass-panel rounded-3xl p-8 lg:p-10 bg-white/5 border border-white/10 shadow-2xl z-10 text-left relative overflow-hidden"
                >
                    {/* Glowing highlight border top */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#6C63FF] to-transparent"></div>

                    {/* Logo/Header */}
                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6C63FF] to-indigo-500 flex items-center justify-center shadow-lg shadow-[#6C63FF]/30 mb-4">
                            <Sparkles className="text-white" size={22} />
                        </div>
                        <h1 className="font-heading font-bold text-3xl text-white tracking-tight">
                            MailOS
                        </h1>
                        <p className="text-sm text-[#AAB3C5] mt-2">
                            Access the professional email generation suite.
                        </p>
                    </div>

                    {/* Alert Message Box */}
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2.5 text-xs text-rose-400"
                        >
                            <AlertCircle size={15} className="shrink-0" />
                            <span>{message}</span>
                        </motion.div>
                    )}

                    {/* Form fields */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div className="relative group">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder=" "
                                value={form.email}
                                onChange={handleChange}
                                className="peer w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-transparent focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF]/30 transition-all duration-300 text-sm"
                            />
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAB3C5] group-focus-within:text-[#6C63FF] transition duration-300" size={16} />
                            <label 
                                htmlFor="email"
                                className="absolute left-11 top-3.5 text-xs text-[#AAB3C5] transition-all duration-300 transform -translate-y-7.5 scale-95 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7.5 peer-focus:scale-95 peer-focus:text-[#6C63FF] pointer-events-none"
                            >
                                Email Address
                            </label>
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder=" "
                                value={form.password}
                                onChange={handleChange}
                                className="peer w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-transparent focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF]/30 transition-all duration-300 text-sm"
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#AAB3C5] group-focus-within:text-[#6C63FF] transition duration-300" size={16} />
                            <label 
                                htmlFor="password"
                                className="absolute left-11 top-3.5 text-xs text-[#AAB3C5] transition-all duration-300 transform -translate-y-7.5 scale-95 origin-left peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-7.5 peer-focus:scale-95 peer-focus:text-[#6C63FF] pointer-events-none"
                            >
                                Password
                            </label>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full mt-4 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold bg-[#6C63FF] text-white cursor-pointer shadow-lg shadow-[#6C63FF]/25 hover:shadow-[#6C63FF]/45 transition duration-300"
                        >
                            <span>{loading ? "Authenticating..." : "Sign In"}</span>
                            <ArrowRight size={16} />
                        </motion.button>
                    </form>

                    {/* Footer link to Signup */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-[#AAB3C5]">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-[#6C63FF] hover:underline font-semibold cursor-pointer">
                                Register Account
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </MainLayout>
    );
}

export default Login;