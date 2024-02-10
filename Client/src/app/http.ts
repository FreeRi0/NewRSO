import axios from 'axios';

export const HTTP = axios.create({
    // baseURL: 'https://rso.sprint.1t.ru/api/v1', // -> DEV-ветка

    baseURL: 'https://xn--j1ab.xn--d1amqcgedd.xn--p1ai/api/v1/'
    // baseURL: 'https://rso.sprint.1t.ru/api/v1/', // -> DEV-ветка для rso-sprint
    // baseURL: 'http://127.0.0.1:8000/api/v1',
});
