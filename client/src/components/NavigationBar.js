import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

import { Container, Nav, Navbar } from "react-bootstrap";

import "./NavigationBar.css"

export const NavigationBar = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand>Platform</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        {user.uid && <Nav.Link><NavLink to="/allProducts" className="navigation-bar-link">All Products</NavLink></Nav.Link>}
                        {user.uid && <Nav.Link><NavLink to="/myListings" className="navigation-bar-link">My Listings</NavLink></Nav.Link>}
                        {user.uid && <Nav.Link><NavLink onClick={handleLogout} className="navigation-bar-logout">Logout</NavLink></Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};