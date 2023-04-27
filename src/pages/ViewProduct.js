import React from "react";
import { useParams } from "react-router-dom";

const ViewProduct = () => {
    const params = useParams();
    const uid = params.productUid;

    
    return (
        <div>
            ViewProductPage: {uid}
        </div>
    );
};

export default ViewProduct;