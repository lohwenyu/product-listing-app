import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

import './Login.css';

const Login = () => {
    // const [user, setUser] = useState(null);
    // const { login } = useAuth();
    
    // const location = useLocation();
    // const redirectPath = location.state?.path || "";

    const [user, setUser] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        login(user);
    };

    const redirectRegister = () => {
        navigate('/register')
    };

    return (
        <div className="login-container">
            {/* <h1>Login Page</h1>
            <label>Name</label>
            <input type="text" onChange={(e) => setUser(e.target.value)} />
            <button type="submit" onClick={handleLogin}>
                Login
            </button> */}

            <Form className="login-form">
                <h1>Login</h1>
                <Form.Group className="form-input">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={(e) => setUser(e.target.value)} />
                </Form.Group>
                <Form.Group className="form-input" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>
                <Button variant="outline-primary" type="submit" onClick={handleLogin} className="button">
                    Login
                </Button>
                <br/>
                <Form.Text>New to Platform?</Form.Text>
                <Button variant="link" onClick={redirectRegister}>Register here</Button>
            </Form>
        </div>
    );
};

export default Login;