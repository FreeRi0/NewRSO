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
        // console.log(config.headers.Accept);
        if (config.url == '/token/login/' || config.url == '/register/' || config.url == '/exchange-token/' || config.url == '/rsousers/me/') {
            delete config.headers.Authorization;
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