import React, { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || "/profile";
    const [user, setUser] = useState({
        username: "",
        permissions: [],
    });
    const [error, setError] = useState();

    const login = (user) => {
        setUser({ username: user.username, permissions: ["authorised"] });
        navigate(redirectPath, { replace: true });
    };
    const logout = () => {
        setUser({ username: "", permissions: [] });
    };
    const register = async (user) => {
    
        try {
            const response = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: user.username, 
                    email: user.email,
                    password: user.password 
                })
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            };

            console.log(responseData);
            setUser({ username: user.username, permissions: ["authorised"] });
            login(user);

        } catch (err) {
            console.log(err);
            setError(err.message || "Something went wrong, please try again.")
        };

    }
    return <AuthContext.Provider value={{ user, login, logout, register, error }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};