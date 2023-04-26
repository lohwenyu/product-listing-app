import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

import './Login.css';

const Login = () => {

    const [user, setUser] = useState({});
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const handleInput = (e) => {
        const {name, value} = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        login(user);
    };

    const redirectRegister = () => {
        navigate('/register')
    };

    return (
        <div className="login-container">
            <Form className="login-form">
                <h1>Login</h1>
                <Form.Group className="form-input">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={handleInput} name="email"/>
                </Form.Group>
                <Form.Group className="form-input">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleInput} name="password"/>
                </Form.Group>
                <Button variant="outline-primary" type="submit" onClick={handleLogin} className="button">
                    Login
                </Button>
                {error && <p className="error-message">{error}</p>}
                <br/>
                <Form.Text>New to Platform?</Form.Text>
                <Button variant="link" onClick={redirectRegister}>Register here</Button>
            </Form>
        </div>
    );
};

export default Login;