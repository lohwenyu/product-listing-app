import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

import { Container, Nav, Navbar } from "react-bootstrap";

export const NavigationBar = () => {
    const { user } = useAuth();
    return (
        <nav>
            <NavLink to="/">All Products</NavLink>
            <NavLink to="/about">About</NavLink>
            {user.username && <NavLink to="/profile">Profile</NavLink>}
            {!user.username && <NavLink to="/login">Login</NavLink>}
            <NavLink to="/myListings">My Listings</NavLink>
        </nav>

        // <Navbar bg="light" expand="lg">
        //     <Container>
        //         <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //         <Navbar.Collapse id="basic-navbar-nav">
        //             <Nav className="me-auto">
        //                 <Nav.Link href="/">All Products</Nav.Link>
        //                 <Nav.Link href="/about">About</Nav.Link>
        //                 {user.username && <Nav.Link href="/profile">Profile</Nav.Link>}
        //                 {!user.username && <Nav.Link href="/login">Login</Nav.Link>}
        //                 <Nav.Link href="/myListings">My Listings</Nav.Link>
        //             </Nav>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
    );
};