import React, { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup, SplitButton } from "react-bootstrap";

import { useHttpClient } from "../hooks/http-hook";

import ProductCards from "./ProductCards";

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
];

const AllProducts = () => {

    const [loadedProducts, setLoadedProducts] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [searchText, setSearchText] = useState();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const responseData = await sendRequest("http://localhost:8080/api/listings/all");
                setLoadedProducts(responseData.listings);
            } catch (err) { };
        };
        fetchProducts();
    }, [sendRequest,]);

    const handleCategoryFilter = (e) => {
        const category = e.target.value;
        const fetchProducts = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:8080/api/listings/${category}`);
                setLoadedProducts(responseData.listings);
            } catch (err) { };
        };
        fetchProducts();
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const fetchProducts = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:8080/api/listings/search/${searchText}`);
                setLoadedProducts(responseData.listings);
            } catch (err) { };
        };
        fetchProducts();
    };

    return (
        <div className="main-container">
            <h1>Products</h1>

            <Form>
                <Form.Group className="mb-3 filter-group">
                    <Form.Select onChange={handleCategoryFilter}>
                        <option value="all">Select category...</option>
                        {productCategories.map((category) => {
                            return <option value={category}>{category}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 filter-group">
                    <InputGroup>
                        <Form.Control type="text" placeholder="Search for products..." onChange={(e) => setSearchText(e.target.value)}/>
                        <Button variant="outline-secondary" type="submit" onClick={handleSearch}>Search</Button>
                    </InputGroup>
                </Form.Group>
            </Form>
            <ProductCards loadedProducts={loadedProducts}/>
        </div>
    )
};

export default AllProducts;