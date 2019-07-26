import axios from 'axios';

const http = axios.create({
  baseURL: 'https://dede-frases-api.herokuapp.com/api/',
  timeout: 5000
});

export { http };