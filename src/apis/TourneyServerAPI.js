import axios from 'axios';
const BASE_URL = 'https://tournament-server.herokuapp.com/api/v2/';

export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});