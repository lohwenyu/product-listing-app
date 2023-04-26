import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import image from '../assets/placeholder-image.jpg';

import { useHttpClient } from "../hooks/http-hook";

import './AllProducts.css';

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
]

const AllProducts = () => {

    const [loadedProducts, setLoadedProducts] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const responseData = await sendRequest("http://localhost:8080/api/listings");
                setLoadedProducts(responseData.listings);
            } catch (err) { };
        };
        fetchProducts();
    }, [sendRequest]);

    return (
        <div className="main-container">
            <h1>Products</h1>

            <Form>
                <Form.Select>
                    <option value="All">Select category...</option>
                    {productCategories.map((category) => {
                        return <option value={category}>{category}</option>
                    })}
                </Form.Select>
            </Form>
            {loadedProducts &&
                <div className="product-container">
                    {loadedProducts.map((product) => {
                        return <Card className="product-card">
                            <Card.Img variant="top" src={image} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>{product.price}</Card.Text>
                                <Card.Text>{product.description}</Card.Text>
                                <Button variant="primary">View Product</Button>
                            </Card.Body>
                        </Card>
                    })}
                </div>
            }
        </div>
    )
};

export default AllProducts;