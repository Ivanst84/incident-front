import axios from 'axios';

// Configura la instancia de axios con la URL base de la API
const api = axios.create({
  baseURL: 'https://incident-ap.onrender.com/api',
});

export default api;