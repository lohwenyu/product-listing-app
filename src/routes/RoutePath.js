import React from "react";
import { Routes, Route } from "react-router-dom";
import AllProducts from "../components/AllProducts";
import About from "../components/About";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Authentication from "./Authentication";
import Authorisation from "./Authorisation";
import PERMISSIONS from "../permissions/Permissions";
import MyListings from "../components/MyListings";

const RoutePath = () => {
    return (
        <Routes>
            <Route path="/" element={<AllProducts />} />
            <Route element={<Authorisation permissions={[PERMISSIONS.CAN_VIEW_ABOUT]} />}>
                <Route path="about" element={<About />} />
            </Route>
            <Route
                path="profile"
                element={
                    <Authentication>
                        <Profile />
                    </Authentication>
                }
            />
            <Route element={<Authorisation permissions={[PERMISSIONS.CAN_VIEW_MYLISTINGS]} />}>
                <Route path="myListings" element={<MyListings />} />
            </Route>
            <Route path="login" element={<Login />} />
        </Routes>
    );
};
export default RoutePath;