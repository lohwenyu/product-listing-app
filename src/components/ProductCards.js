import React from "react";
import { Button, Card } from "react-bootstrap";

import "./ProductCards.css";

const ProductCards = ({ loadedProducts }) => {
    return (
        <div>
            {loadedProducts &&
                <div className="product-container">
                    {loadedProducts.map((product) => {
                        return <Card className="product-card">
                            <Card.Img variant="top" src={`http://localhost:8080/${product.image}`} className="product-image" />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Subtitle>${product.price}</Card.Subtitle>
                            </Card.Body>
                            <Button variant="primary">View Product</Button>
                        </Card>
                    })}
                </div>
            }
            {!loadedProducts &&
                <div className="empty-message">
                    <p>No products are listed at the moment.</p>
                </div>
            }
        </div>
    );
};

export default ProductCards;