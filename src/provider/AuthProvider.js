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
    const login = (user) => {
        setUser({ username: user, permissions: ["authorised"] });
        navigate(redirectPath, { replace: true });
    };
    const logout = () => {
        setUser({ username: "", permissions: [] });
    };
    const register = (user) => {
        setUser({ username: user, permissions: ["authorised"] });
        navigate(redirectPath, { replace: true });
    }
    return <AuthContext.Provider value={{ user, login, logout, register }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};