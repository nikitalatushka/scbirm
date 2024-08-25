import api from '../api';
import { Product } from '../../types/product';

export const getProductById = async (productId: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${productId}`);
    return response.data;
};