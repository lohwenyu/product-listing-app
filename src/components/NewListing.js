import React, { useState }  from "react";
import { Form, Button, Image } from "react-bootstrap";

import "./NewListing.css"

const productCategories = ['Clothing', 'Housing', 'Daily Needs']

const NewListing = () => {

    const [listingImages, setListingImages] = useState([]);

    return (
        <div className="new-listing-container">
            <h1>New Listing</h1>
            <Form className="new-listing-form">
                <Form.Group className="mb-3">
                    <Form.Label>Listing Title</Form.Label>
                    <Form.Control placeholder="Name your listing" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select>
                        <option value="" disabled selected>Select category</option>
                        {productCategories.map((category) => {
                            return <option value={category}>{category}</option>
                        })}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control placeholder="Price of your listing" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description (Optional)</Form.Label>
                    <Form.Control as="textarea" placeholder="Describe what you are selling and include any details a buyer might be interested in." />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Add Photos</Form.Label>
                    <Form.Control type="file" multiple accept="image/*" onChange={(e) => setListingImages(Array.from(e.target.files))}/>
                </Form.Group>

                <div className="image-preview-container">
                    {listingImages.map((image) => {
                        return <Image img-fluid src={URL.createObjectURL(image)} className="image-preview"/>
                    })}
                </div>

                <Button variant="primary" type="submit" className="button">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default NewListing;
