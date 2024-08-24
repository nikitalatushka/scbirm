import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api';

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
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts(); // gets `data` from API to get a promise from `fetchStores`
            setProducts(data); // update `store` state 
        };

        getProducts();
        
    }, []);

    return (
        <div className="route-products">
            <h2>Products</h2>
            <div className="product-grid">
                {products.map(product => (
                    <div key={product.product_ID} className="product-card">
                        <h3>{product.product_name}</h3>
                        <p>{product.store_name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;