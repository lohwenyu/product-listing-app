import React from "react";
import { Routes, Route } from "react-router-dom";

import { UnauthorisedLayout } from "./UnauthorisedLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Authorisation from "./Authorisation";
import PERMISSIONS from "../permissions/Permissions";
import AllProducts from "../pages/AllProducts";
import MyListings from "../pages/MyListings";
import ViewProduct from "../pages/ViewProduct";
import NewListing from "../pages/NewListing";

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
                <Route path="/viewProduct/:productUid" element={<ViewProduct />} />
                <Route path="/newListing" element={<NewListing />} />
            </Route>
        </Routes>
    );
};
export default RoutePath;