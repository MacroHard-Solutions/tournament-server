import axios from 'axios';
const BASE_URL = 'http://54.197.128.13:8001/game-server';

export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});