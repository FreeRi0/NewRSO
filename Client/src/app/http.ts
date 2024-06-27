import axios from 'axios';
export const HTTP = axios.create({
    //  baseURL: 'https://xn--j1ab.xn--d1amqcgedd.xn--p1ai/api/v1/',
     baseURL: 'http://213.139.208.147:30000/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

HTTP.interceptors.request.use(
    (config) => {

        if (config.url == '/jwt/create/' || config.url == '/register/' || config.url == '/exchange-token/' || config.url == '/jwt/vk-login/' || config.url == '/jwt/verify/' || config.url == '/jwt/refresh/' || config.url == '/regions/' || config.url =='/reset_password/') {
            delete config.headers.Authorization;
        } else {
            config.headers.Authorization =
                'JWT ' + localStorage.getItem('jwt_token');
        }
        return config;
    },
    function (error) {
        console.log('aborted');
        return error;
    },
);
