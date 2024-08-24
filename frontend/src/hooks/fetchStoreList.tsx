import axios from 'axios';

export const fetchStoreList = async () => {
  try {
    const response = await axios.get('http://localhost:1337/stores');
    return response.data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    return [];
  }
};