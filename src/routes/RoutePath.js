import React from "react";
import { Routes, Route } from "react-router-dom";

import { UnauthorisedLayout } from "./UnauthorisedLayout";
import Login from "../components/Login";
import Register from "../components/Register";

import Authorisation from "./Authorisation";
import PERMISSIONS from "../permissions/Permissions";
import AllProducts from "../components/AllProducts";
import MyListings from "../components/MyListings";
import NewListing from "../components/NewListing";

const RoutePath = () => {
    return (
        <Routes>
            <Route element={<UnauthorisedLayout />}>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<Authorisation permissions={[PERMISSIONS.IS_AUTHORISED]} />}>
                <Route path="/allProducts" element={<AllProducts />} />
                <Route path="/myListings" element={<MyListings />} />
                <Route path="/newListing" element={<NewListing />} />
            </Route>
        </Routes>
    );
};
export default RoutePath;