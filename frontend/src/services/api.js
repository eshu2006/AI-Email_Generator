import axios from "axios";

const api = axios.create({
    baseURL: window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://localhost:8000"
        : "https://ai-email-generator-j7bt.onrender.com",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;