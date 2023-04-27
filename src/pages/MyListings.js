import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../provider/AuthProvider";
import { useHttpClient } from "../hooks/http-hook";

import './MyListings.css';
import ProductCards from "../components/ProductCards";

const MyListings = () => {

    const { user } = useAuth();

    const [loadedListings, setLoadedListings] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const navigate = useNavigate()

    const redirectNewListing = () => {
        navigate('/newListing')
    }

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:8080/api/listings/user/${user.uid}`);
                setLoadedListings(responseData.listings);
            } catch (err) { };
        };
        fetchListings();
    }, [sendRequest]);

    return (
        <div className="main-container">
            <h1>My Listings</h1>
            <Button className="new-listing-button" variant="primary" onClick={redirectNewListing}>New Listing</Button>
            <ProductCards loadedProducts={loadedListings}/>
        </div>
    )

};

export default MyListings;