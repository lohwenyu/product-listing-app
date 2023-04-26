import React from "react";
import { useAuth } from "../provider/AuthProvider";

import { Form, Button } from "react-bootstrap";

const Profile = () => {
    const { user, logout } = useAuth();
    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <h1>Profile {user.uid}</h1>

            

            <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
        </>
    );
};

export default Profile;