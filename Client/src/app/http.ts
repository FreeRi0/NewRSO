import axios from 'axios';
export const HTTP = axios.create({
    // baseURL: 'https://xn--j1ab.xn--d1amqcgedd.xn--p1ai/api/v1/'
    baseURL: 'https://rso.sprint.1t.ru/api/v1/',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
})

HTTP.interceptors.request.use(
    (config) => {
        if (config.url == '/token/login/' || config.url == '/register/' || config.url == '/exchange-token/' || config.url == '/jwt/vk-login/') {
            delete config.headers.Authorization;
        } else if (config.url == 'rsousers/me/') {
            config.headers.Authorization = 'JWT ' + localStorage.getItem('JWT');
        } else {
            config.headers.Authorization = 'Token ' + localStorage.getItem('Token');
        }
        return config;

    },
    function (error) {
        console.log('aborted')
        return error;
    }
);

