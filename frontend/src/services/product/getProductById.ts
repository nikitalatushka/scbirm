import api from '../api';
import { Product } from '../../types/product';

export const getProductById = async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
};