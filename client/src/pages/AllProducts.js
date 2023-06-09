import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

import { useHttpClient } from "../hooks/http-hook";

import ProductPage from "../components/ProductPage";

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
    const { sendRequest } = useHttpClient();

    const [searchText, setSearchText] = useState("all");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const responseData = await sendRequest("http://localhost:8080/api/listings/all");
                setLoadedProducts(responseData.listings);
            } catch (err) { };
        };
        fetchProducts();
    }, [sendRequest]);

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

    const handleSearchText = (e) => {
        const text = e.target.value.trim();
        if (text) {
            setSearchText(text);
        } else {
            setSearchText("all")
        }
    }

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
                        {productCategories.map((category, index) => {
                            return <option key={index} value={category}>{category}</option>
                        })}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 filter-group">
                    <InputGroup>
                        <Form.Control type="text" placeholder="Search for products..." onChange={handleSearchText}/>
                        <Button variant="outline-secondary" type="submit" onClick={handleSearch}>Search</Button>
                    </InputGroup>
                </Form.Group>
            </Form>
            <ProductPage loadedProducts={loadedProducts}/>
        </div>
    )
};

export default AllProducts;