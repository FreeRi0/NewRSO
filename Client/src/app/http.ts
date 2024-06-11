import axios from 'axios';
import routes from './router/routes';
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
        if (config.url == '/jwt/create/' || config.url == '/register/' || config.url == '/exchange-token/' || config.url == '/jwt/vk-login/' || config.url == '/jwt/verify/' || config.url == '/jwt/refresh/') {
            delete config.headers.Authorization;
        } else {
            config.headers.Authorization = 'JWT ' + localStorage.getItem('jwt_token');
        }
        return config;

    },
    function (error) {
        console.log('aborted')
        return error;
    }
);

HTTP.interceptors.response.use(
    (response) => {
        return response;
    },  (error) => {
        if (!error.hasOwnProperty('response')) {
            return Promise.reject(error);
        }
        const updateToken = async () => {
            try {
                const resp = await HTTP.post('/jwt/refresh/', { refresh: localStorage.getItem('refresh_token') });
                localStorage.setItem('jwt_token', resp.data.access);
                localStorage.setItem('refresh_token', resp.data.refresh);
            } catch (e) {
                console.error('Error refreshing token:', e);
            }
        };
        const verifyToken = async () => {
            try {
                const resp = await HTTP.post('/jwt/verify/', { token: localStorage.getItem('jwt_token') })
                if (resp.status == 200) {
                  console.log('good')
                } else if (resp.status == 401) {
                    updateToken()
                }

            } catch (error) {
                console.log(error)
            }
        }
        verifyToken();
        if (error ? error.response.status === 403 : false) {
            //  routes.push({ name: 'mypage' });
        }
        return Promise.reject(error);
});

//originalRequest._retry = true;