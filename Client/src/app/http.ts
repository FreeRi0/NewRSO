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

// HTTP.interceptors.response.use(
//     (response) => {
//         return response;
//     },  (error) => {
//         if (!error.hasOwnProperty('response')) {
//             return Promise.reject(error);
//         }
//         const originalRequest = error.config;
//         if (error && false && error.response ? error.response.status === 401 : false) {
//             const userStore = useUserStore();
//             if (userStore.token && !userStore.adminAsDealer) {
//                 if (!refreshTokenPromise) {
//                     refreshTokenPromise = api.post('/auth/refresh')
//                         .then((response) => {
//                             userStore.setToken(response.data);
//                             refreshTokenPromise = null;
//                             originalRequest._retry = true;
//                             return api(originalRequest);
//                         })
//                         .catch(() => {
//                             refreshTokenPromise = null;
//                             userStore.clearUser();
//                             router.push({ name: 'auth.login' }).then(() => {});
//                         })
//                 } else {
//                     setTimeout(() => {
//                         if (userStore.auth) {
//                             originalRequest._retry = true;
//                             return api(originalRequest);
//                         }
//                     }, 2000);
//                 }
//             } else {
//                 routes.push({ name: '/' });
//             }
//         }
//         if (error ? error.response.status === 403 : false) {
//             routes.push({ name: 'mypage' });
//         }
//         return Promise.reject(error);
// });
