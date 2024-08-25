import api from '../api';
import { Recipe } from '../../types/recipe';

export const getProductRecipe = async (productId: number): Promise<Recipe> => {
    const response = await api.get<Recipe>(`/products/${productId}/recipe`);
    return response.data;
};