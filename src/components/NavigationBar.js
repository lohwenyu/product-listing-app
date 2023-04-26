import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

import { Container, Nav, Navbar } from "react-bootstrap";

import "./NavigationBar.css"

export const NavigationBar = () => {
    const { user } = useAuth();
    return (
        <Navbar bg="light" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand>Platform</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        {user.uid && <Nav.Link><NavLink to="/allProducts" className="navigation-bar-link">All Products</NavLink></Nav.Link>}
                        {user.uid && <Nav.Link><NavLink to="/myListings" className="navigation-bar-link">My Listings</NavLink></Nav.Link>}
                        {user.uid && <Nav.Link><NavLink to="/profile" className="navigation-bar-link">Profile</NavLink></Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};