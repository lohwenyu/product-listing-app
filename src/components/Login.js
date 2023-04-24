import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

const Login = () => {
    const [user, setUser] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectPath = location.state?.path || "";

const handleLogin = () => {
        login(user);
    };
    return (
        <>
            {/* <h1>Login Page</h1>
            <label>Name</label>
            <input type="text" onChange={(e) => setUser(e.target.value)} />
            <button type="submit" onClick={handleLogin}>
                Login
            </button> */}

            <Form>
                <h1>Login Page</h1>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={(e) => setUser(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleLogin}>
                    Login
                </Button>
            </Form>
        </>
    );
};

export default Login;