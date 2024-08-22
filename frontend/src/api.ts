import axios from 'axios';

export const fetchStores = async () => {
  try {
    const response = await axios.get('http://localhost:3000/stores');
    return response.data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    return [];
  }
};