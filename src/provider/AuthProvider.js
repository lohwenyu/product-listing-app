import React, { createContext, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage-hook";

import { useHttpClient } from "../hooks/http-hook";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || "/allProducts";
    const [user, setUser] = useLocalStorage("user", {
        uid: "",
        permissions: [],
    });
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const login = async (user) => {

        clearError()

        try {
            const responseData = await sendRequest(
                "http://localhost:8080/api/users/login", 
                "POST",
                JSON.stringify({
                    email: user.email,
                    password: user.password
                }),
                {
                    "Content-Type": "application/json"
                }
            );
            setUser({ uid: responseData.user, permissions: ["authorised"] });
            navigate(redirectPath, { replace: true });

        } catch (err) {};
    };

    const logout = () => {
        setUser({ uid: "", permissions: [] });
    };

    const register = async (user) => {

        clearError()

        try {
            const responseData = await sendRequest(
                "http://localhost:8080/api/users/register",
                "POST",
                JSON.stringify({
                    username: user.username,
                    email: user.email,
                    password: user.password
                }),
                {
                    "Content-Type": "application/json"
                },
            );
            setUser({ uid: responseData.user, permissions: ["authorised"] });
            navigate(redirectPath, { replace: true });

        } catch (err) {};

    }
    return <AuthContext.Provider value={{ user, login, logout, register, error }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};