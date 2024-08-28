import { describe } from 'node:test'
import { IProduct } from '../../models/product.model'
import { array } from 'zod';

describe('Product', () => {
    const product: IProduct = {
        ID: 2001,
        name: 'Nail',
        time: 5,
        value: 80,
        level: 1,
        store_ID: 4001,
    };
});

describe('getProductById({ productId })', () => {
    describe('given an input of productId<number>', (productId) => {
        it('should return a single product, not an array of products', () => {
            expect(Array.isArray()).toBe(false);
        });
        it('should return an instance of IProduct', () => {});
    });
});

describe('getAllProducts', () => {
    
});
