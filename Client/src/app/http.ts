import axios from 'axios';

export const HTTP = axios.create({
    // baseURL: process.env.VUE_APP_URL,//

    // baseURL: 'https://xn--j1ab.xn--d1amqcgedd.xn--p1ai/api/v1/' // -> MAIN-ветка
    baseURL: 'https://rso.sprint.1t.ru/api/v1/', // -> DEV-ветка
    // baseURL: 'http://127.0.0.1:8000/api/v1',
});
