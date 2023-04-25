import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

import { Container, Nav, Navbar } from "react-bootstrap";

import "./NavigationBar.css"

export const NavigationBar = () => {
    const { user } = useAuth();
    return (
        // <nav>
        //     {user.username && <NavLink to="/allProducts">All Products</NavLink>}
        //     {user.username && <NavLink to="/myListings">My Listings</NavLink>}
        //     {user.username && <NavLink to="/profile">Profile</NavLink>}
        // </nav>

        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>Platform</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        {user.username && <Nav.Link><NavLink to="/allProducts" className="navigation-bar-link">All Products</NavLink></Nav.Link>}
                        {user.username && <Nav.Link><NavLink to="/myListings" className="navigation-bar-link">My Listings</NavLink></Nav.Link>}
                        {user.username && <Nav.Link><NavLink to="/profile" className="navigation-bar-link">Profile</NavLink></Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};