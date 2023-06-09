import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

export const UnauthorisedLayout = () => {
    const { user } = useAuth();
    const location = useLocation();

    if (user.uid) {
        return <Navigate to="/allProducts" state={{ path: location.pathname }} replace />;
    }

    return (
        <div>
            <Outlet />
        </div>
    )
};