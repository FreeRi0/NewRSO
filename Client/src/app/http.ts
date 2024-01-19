import axios from 'axios';

export const HTTP = axios.create({
    // baseURL: process.env.VUE_APP_URL,//
    //baseURL: 'https://rso.sprint.1t.ru/api/v1'
    // baseURL: 'http://127.0.0.1:8000/api/v1',
    baseURL: 'https://rso.sprint.1t.ru/api/v1'
});
