import axios from 'axios';

export const HTTP = axios.create({
    baseURL: `http://localhost:5000/api/`,
    headers: {
        // Authorization: 'Bearer {token}'
        'Content-Type': 'application/json',
        mode: 'cors',
    },
});
