import axios from 'axios';

export const fetchStores = async () => {
  try {
    const response = await axios.get('http://localhost:1337/stores');
    return response.data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    return [];
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:1337/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products: ', error);
    return [];
  }
};