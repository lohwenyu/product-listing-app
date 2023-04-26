import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

import './Register.css';

const Register = () => {
    
    const [user, setUser] = useState({});
    const { register, error } = useAuth();
    const navigate = useNavigate();

    const handleInput = (e) => {
        const {name, value} = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        register(user);
    };

    const redirectLogin = () => {
        navigate('/')
    };

    return (
        <div className="register-container">
            <Form className="register-form">
                <h1>Register</h1>
                <Form.Group className="form-input">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" onChange={handleInput} name="username"/>
                </Form.Group>
                <Form.Group className="form-input">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={handleInput} name="email"/>
                </Form.Group>
                <Form.Group className="form-input">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handleInput} name="password"/>
                </Form.Group>
                <Button variant="outline-primary" type="submit" onClick={handleRegister} className="button">
                    Register
                </Button>
                {error && <p className="error-message">{error}</p>}
                <br/>
                <Form.Text>Already have an account?</Form.Text>
                <Button variant="link" onClick={redirectLogin}>Login here</Button>
            </Form>
        </div>
    );
};

export default Register;
