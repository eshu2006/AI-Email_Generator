import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const storedUser = localStorage.getItem("user");

const [user, setUser] = useState(
    storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null
);
    const loginUser = (data) => {

    console.log("loginUser called");

    console.log("Token:", data.access_token);

    localStorage.setItem("token", data.access_token);

    localStorage.setItem("user", JSON.stringify(data.user));

    console.log("Stored Token:", localStorage.getItem("token"));

    setUser(data.user);

};

    const logoutUser = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                loginUser,
                logoutUser
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}