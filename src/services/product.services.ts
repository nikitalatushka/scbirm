import { IProductModel } from '../models/product.model'
import { IDModel } from '../models/id.model'
import { pool } from '../config/mariadb.pool'


export async function findProductById ( 
    input: IDModel,
    output: IProductModel
 ) {
    const product_ID = input;

    // map mysql query response to IProductModel type
    const 
    return output;
}