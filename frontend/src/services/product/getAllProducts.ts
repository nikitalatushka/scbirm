import api from '../api';
import { Product } from '../../types/product';

export const getAllProducts = async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products');
    return response.data;
};