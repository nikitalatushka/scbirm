import express from 'express';
import { pool } from '../config/mariadb.pool';
import { findProductById } from '../services/product.services';
import { IProductModel } from '../models/product.model';

export class ProductController {
    public async getProductByID(
        req: express.Request, 
        res: express.Response,
    ) {
        const productID = req.body;
        let product: IProductModel;
    
        findProductById(productID, product)
    
        const [products] = await pool.query<IProductModel[]>(sql, []);
    
        res.send()
        return 
    }
}

