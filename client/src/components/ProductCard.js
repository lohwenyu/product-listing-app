import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

import "./ProductCard.css";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleViewProduct = (e) => {
        const redirectPath = location.state?.path || `/viewProduct/${e.target.value}`;
        navigate(redirectPath);
    };

    return (
        <Card className="product-card" >
            <Card.Img variant="top" src={`http://localhost:8080/${product.image}`} className="product-image" />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle>${product.price}</Card.Subtitle>
            </Card.Body>
            <Button value={product.uid} variant="primary" onClick={handleViewProduct}>View Product</Button>
        </Card>
    );
};

export default ProductCard;