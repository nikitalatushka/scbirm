import axios from 'axios';

export const fetchProductList = async () => {
    try {
      const response = await axios.get('http://localhost:1337/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products: ', error);
      return [];
    }
  };