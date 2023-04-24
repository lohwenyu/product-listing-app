import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import image from '../assets/placeholder-image.jpg';

import './AllProducts.css';

const products = [
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
    },
    {
        uid: "5",
        category: "Daily Needs",
        image: image,
        name: "product 5", 
        price: "$100", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
        uid: "6",
        category: "Housing",
        image: image,
        name: "product 6", 
        price: "$120", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
        uid: "7",
        category: "Housing",
        image: image,
        name: "product 7", 
        price: "$204", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
        uid: "8",
        category: "Daily Needs",
        image: image,
        name: "product 8", 
        price: "$100", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
        uid: "7",
        category: "Housing",
        image: image,
        name: "product 7", 
        price: "$204", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    },
    {
        uid: "8",
        category: "Daily Needs",
        image: image,
        name: "product 8", 
        price: "$100", 
        description: "Some quick example text to build on the card title and make up the bulk of the card's content."
    }
]

const productCategories = ['Clothing', 'Housing', 'Daily Needs']

const AllProducts = () => {
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
            
            <div className="product-container">
                {products.map((product) => {
                    return <Card className="product-card">
                        <Card.Img variant="top" src={product.image} />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.price}</Card.Text>
                            <Card.Text>{product.description}</Card.Text>
                            <Button variant="primary">View Product</Button>
                        </Card.Body>
                    </Card>
                })}
            </div>
        </div>
    )
};

export default AllProducts;