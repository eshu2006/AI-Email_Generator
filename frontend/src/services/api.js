import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-email-generator-j7bt.onrender.com",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;