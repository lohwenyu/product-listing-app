import React, { useState } from "react";
import { Form, Button, Image, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../provider/AuthProvider";
import { useHttpClient } from "../hooks/http-hook";

import "./NewListing.css"

const productCategories = [
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Clothing",
    "Shoes",
    "Jewellery",
    "Toys and Games",
    "Health",
    "Household",
    "Baby Care",
    "Electronics",
    "Sports and Outdoors",
    "Pet Supplies",
    "Office Supplies",
    "Arts, Crafts & Sewing",
    "Appliances",
    "Books",
    "Others"
];

const NewListing = () => {

    const { user } = useAuth();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const navigate = useNavigate();

    const [newListing, setNewListing] = useState({});
    const [listingImages, setListingImages] = useState([]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setNewListing(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await sendRequest(
                "http://localhost:8080/api/listings/newListing",
                "POST",
                JSON.stringify({
                    user_uid: user.uid, 
                    category: newListing.category, 
                    name: newListing.name, 
                    price: newListing.price, 
                    description: newListing.description
                }),
                {
                    "Content-Type": "application/json"
                }
            );
            navigate('/myListings');
        } catch (err) {};
    };

    return (
        <div className="new-listing-container">
            <h1>New Listing</h1>
            <Form className="new-listing-form">
                <Form.Group className="mb-3">
                    <Form.Label>Listing Title</Form.Label>
                    <Form.Control placeholder="Name your listing" onChange={handleInput} name="name" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select onChange={handleInput} name="category">
                        <option value="" disabled selected>Select category</option>
                        {productCategories.map((category) => {
                            return <option value={category}>{category}</option>
                        })}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control placeholder="Price of your listing" onChange={handleInput} name="price" />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description (Optional)</Form.Label>
                    <Form.Control as="textarea" placeholder="Describe what you are selling and include any details a buyer might be interested in." onChange={handleInput} name="description" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Add Photos</Form.Label>
                    <Form.Control type="file" multiple accept="image/*" onChange={(e) => setListingImages(Array.from(e.target.files))} />
                </Form.Group>

                <div className="image-preview-container">
                    {listingImages.map((image) => {
                        return <Image img-fluid src={URL.createObjectURL(image)} className="image-preview" />
                    })}
                </div>

                <Button variant="primary" type="submit" className="button" onClick={handleSubmit} >
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default NewListing;
