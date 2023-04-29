import React, { useState, useEffect } from "react";
import Pagination from 'react-bootstrap/Pagination';
import ProductCard from "./ProductCard";

import "./ProductPage.css";

const ProductPage = ({ loadedProducts }) => {
    const [currentPage, setCurrentPage] = useState("1");
    const recordsPerPage = 10;

    const [lastRecord, setLastRecord] = useState(recordsPerPage);
    const [firstRecord, setFirstRecord] = useState(0);

    const [currentRecords, setCurrentRecords] = useState();
    const [numPages, setNumPages] = useState(0);
    const [pageNumbers, setPageNumbers] = useState();

    const [totalProducts, setTotalProducts] = useState();

    const handlePageChange = (e) => {
        const page = e.target.text;

        if (page !== currentPage) {
            const tempLastRecord = Math.min(page * recordsPerPage, loadedProducts.length);

            let tempFirstRecord;
            if (page > currentPage) {
                tempFirstRecord = Math.max(lastRecord, tempLastRecord - recordsPerPage);
            } else {
                tempFirstRecord = tempLastRecord - recordsPerPage;
            }

            setCurrentPage(page);
            setLastRecord(tempLastRecord);
            setFirstRecord(tempFirstRecord);
        };
    };

    const reset = () => {
        setCurrentPage("1");
        setLastRecord(recordsPerPage);
        setFirstRecord(0);
    }

    useEffect(() => {
        if (loadedProducts) {
            setCurrentRecords(loadedProducts.slice(firstRecord, lastRecord));
            const tempTotalProducts = loadedProducts.length;
            const tempNumPages = Math.ceil(tempTotalProducts / recordsPerPage);
            setNumPages(tempNumPages);
            setPageNumbers([...Array(tempNumPages + 1).keys()].slice(1));
            setTotalProducts(tempTotalProducts);
        }
        if (loadedProducts && loadedProducts.length !== totalProducts) {
            reset()
        }
    }, [firstRecord, lastRecord, recordsPerPage, numPages, loadedProducts]);

    return (
        <div>
            {currentRecords &&
                <>
                    <div className="product-container">
                        {currentRecords.map((product, index) => {
                            return <ProductCard key={index} product={product} />
                        })}
                    </div>

                    <Pagination size="sm" className="pagination">
                        {pageNumbers.map((pageNum) => {
                            return <Pagination.Item key={pageNum} active={pageNum.toString() === currentPage} onClick={handlePageChange}>
                                {pageNum}
                            </Pagination.Item>
                        })}
                    </Pagination>
                </>
            }
            {(!currentRecords || totalProducts === 0) &&
                <div className="empty-message">
                    <p>No products are listed at the moment.</p>
                </div>
            }
        </div>
    );
};

export default ProductPage;