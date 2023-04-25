import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import image from '../assets/placeholder-image.jpg';

import './MyListings.css';

const listings = [
    {
        uid: "1",
        category: "Clothing",
        image: image,
        name: "product 1", 
        price: "$100", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
        uid: "2",
        category: "Housing",
        image: image,
        name: "product 2", 
        price: "$5", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
        uid: "3",
        category: "Daily Needs",
        image: image,
        name: "product 3", 
        price: "$20", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
        uid: "4",
        category: "Daily Needs",
        image: image,
        name: "product 4", 
        price: "$100", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    }
]



const MyListings = () => {

    const navigate = useNavigate()

    const redirectNewListing = () => {
        navigate('/newListing')
    }

    return (
        <div className="main-container">
            <h1>My Listings</h1>
            <Button variant="primary" onClick={redirectNewListing}>New Listing</Button>

            <div className="listing-container">
                {listings.map((listing) => {
                    return <Card className="listing-card">
                        <Card.Img variant="top" src={listing.image} />
                        <Card.Body>
                            <Card.Title>{listing.name}</Card.Title>
                            <Card.Text>{listing.price}</Card.Text>
                            <Card.Text>{listing.description}</Card.Text>
                            <Button variant="primary">Edit Listing</Button>
                        </Card.Body>
                    </Card>
                })}
            </div>
        </div>
    )

};

export default MyListings;