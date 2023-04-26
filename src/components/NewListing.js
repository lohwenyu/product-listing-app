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

    const [newListing, setNewListing] = useState({
        description: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setNewListing(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleImageInput = (e) => {
        const image = Array.from(e.target.files)[0];
        setNewListing(prevUser => ({
            ...prevUser,
            image: image
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("user_uid", user.uid);
            formData.append("category", newListing.category);
            formData.append("name", newListing.name);
            formData.append("price", newListing.price);
            formData.append("description", newListing.description);
            formData.append("image", newListing.image);

            await sendRequest(
                "http://localhost:8080/api/listings/newListing",
                "POST",
                formData
            );
            navigate('/myListings');
        } catch (err) { };
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
                    <Form.Control type="file" accept="image/*" onChange={handleImageInput} name="image" />
                </Form.Group>

                {newListing.image ?
                    <Image src={URL.createObjectURL(newListing.image)} className="image-preview" />
                    :
                    <p className="image-message">Upload an image.</p>
                }
                <Button variant="primary" type="submit" className="button" onClick={handleSubmit} >
                    Submit
                </Button>

            </Form>
        </div>
    );
};

export default NewListing;
