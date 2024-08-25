import axios from 'axios';

// create an instance of axios 
const api = axios.create({
    baseURL: 'http://localhost:1773',
    headers: {'Content-Type': 'application/json',},
});

// Optional: Add a request interceptor to include authentication tokens, etc. 
// Optional: Add a response interceptor for handling responses globally

export default api; 