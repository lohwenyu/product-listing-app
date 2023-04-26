import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../provider/AuthProvider";
import { useHttpClient } from "../hooks/http-hook";

import './MyListings.css';

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
            <Button variant="primary" onClick={redirectNewListing}>New Listing</Button>
            {loadedListings &&
                <div className="listing-container">
                    {loadedListings.map((listing) => {
                        return <Card className="listing-card">
                            <Card.Img variant="top" src={`http://localhost:8080/${listing.image}`} />
                            <Card.Body>
                                <Card.Title>{listing.name}</Card.Title>
                                <Card.Text>{listing.price}</Card.Text>
                                <Card.Text>{listing.description}</Card.Text>
                                <Button variant="primary">View Listing</Button>
                            </Card.Body>
                        </Card>
                    })}
                </div>
            }
        </div>
    )

};

export default MyListings;