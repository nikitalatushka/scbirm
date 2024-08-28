import { describe } from 'node:test'
import { IProductModel } from '../models/product.model'

describe('Product', () => {
    const product: IProductModel = {
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
            expect(Array.isArray(productId)).toBe(false);
        });
        it('should return an instance of IProduct', () => {});
    });
});

describe('getAllProducts', () => {
    
});
