import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Unauthorised from "../components/Unauthorised";
import { useAuth } from "../provider/AuthProvider";

const Authorisation = ({ permissions }) => {
    const { user } = useAuth();
    const location = useLocation();
    if (user.uid) {
        const userpermission = user.permissions;
        const isAllowed = permissions.some((allowed) => userpermission.includes(allowed));
        return isAllowed ? <Outlet /> : <Unauthorised />;
    }
    return <Navigate to="/" state={{ path: location.pathname }} replace />;
};

export default Authorisation;