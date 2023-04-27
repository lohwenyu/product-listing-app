import React, { useEffect, useState } from "react";
import { Image, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import { useHttpClient } from "../hooks/http-hook";

import './ViewProduct.css';

const ViewProduct = () => {

    const { productUid } = useParams();
    const navigate = useNavigate();

    const [loadedProduct, setLoadedProduct] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:8080/api/listings/id/${productUid}`);
                setLoadedProduct(responseData.listing[0]);
            } catch (err) { };
        };
        fetchProduct();
        console.log(loadedProduct)
    }, [sendRequest]);

    return (
        <div className="main-container">
            <h1>Product Details</h1>
            {loadedProduct &&
                <div className="product-details-container">
                    <Image src={`http://localhost:8080/${loadedProduct.image}`} className="large-product-image" />
                    <div className="product-details">
                        <h3>
                            {loadedProduct.name}
                        </h3>
                        <h4>${loadedProduct.price}</h4>
                        <Button variant="outline-secondary" className="mb-3" disabled size="sm">{loadedProduct.category}</Button>
                        <p>{loadedProduct.description}</p>
                    </div>
                </div>
            }
        </div>
    )

};

export default ViewProduct;