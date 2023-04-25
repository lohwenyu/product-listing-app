import React from "react";
import { Routes, Route } from "react-router-dom";

import { UnauthorisedLayout } from "./UnauthorisedLayout";
import Login from "../components/Login";
import Register from "../components/Register";

import Authorisation from "./Authorisation";
import PERMISSIONS from "../permissions/Permissions";
import AllProducts from "../components/AllProducts";
import MyListings from "../components/MyListings";
import Profile from "../components/Profile";

const RoutePath = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<AllProducts />} />
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
            <Route path="login" element={<Login />} /> */}

            <Route element={<UnauthorisedLayout />}>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<Authorisation permissions={[PERMISSIONS.IS_AUTHORISED]} />}>
                <Route path="/allProducts" element={<AllProducts />} />
                <Route path="/myListings" element={<MyListings />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Routes>
    );
};
export default RoutePath;