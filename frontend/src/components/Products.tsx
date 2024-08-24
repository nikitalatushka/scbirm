import React, {useState, useEffect } from 'react';

interface Product {
    product_ID: number;
    product_name: string;
    production_time: number;
    sale_value: number;
    level_unlocked: number;
    store_name: string;
    store_ID: number;
}

const Products: React.FC = () => {
    return (
        <div className="product-grid">
            <h2>Products</h2>
        </div>
    );
};

export default Products;