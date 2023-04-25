import React from "react";
import { useAuth } from "../provider/AuthProvider";

const Profile = () => {
    const { user, logout } = useAuth();
    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <h1>Welcome {user.username}</h1>
            
            <button type="submit" onClick={handleLogout}>
                Logout
            </button>
        </>
    );
};

export default Profile;