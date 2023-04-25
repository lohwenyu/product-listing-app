import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

import './Register.css';

const Register = () => {
    
    const [user, setUser] = useState(null);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleRegister = () => {
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
                    <Form.Control type="text" placeholder="Username" onChange={(e) => setUser(e.target.value)} />
                </Form.Group>
                <Form.Group className="form-input">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group className="form-input" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>
                <Form.Group className="form-input" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password"/>
                </Form.Group>
                <Button variant="outline-primary" type="submit" onClick={handleRegister} className="button">
                    Register
                </Button>
                <br/>
                <Form.Text>Already have an account?</Form.Text>
                <Button variant="link" onClick={redirectLogin}>Login here</Button>
            </Form>
        </div>
    );
};

export default Register;
