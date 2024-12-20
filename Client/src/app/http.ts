import axios from 'axios';
import { useUserStore } from '@features/store';
import router from './router';
import { ref } from 'vue';

export const HTTP = axios.create({

    baseURL: 'https://xn--j1ab.xn--d1amqcgedd.xn--p1ai/api/v1/',  //https://xn--j1ab.xn--d1amqcgedd.xn--p1ai/api/v1/  //http://213.139.208.147:30000/api/v1/
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

const refreshTokenPromise = ref({});

const urls = [
    '/jwt/create/',
    '/register/',
    '/exchange-token/',
    '/jwt/vk-login/',
    '/jwt/verify/',
    '/jwt/refresh/',
    '/regions/',
    '/reset_password/',
    '/users/reset_password_confirm/',
];

const urls_get = [
    'competitions/1/',
    '/events/',
    '/detachments/',
    '/districts/',
    '/regionals/',
    '/eduicational_institutions/',
    '/locals/',
    '/educationals/',
    '/centrals/1/',
    '/centrals/1/leadership/'
]


HTTP.interceptors.request.use(
    (config) => {
        const configUrl = config.url?.split('?').shift();
        if (urls.some((item) => item === configUrl) ||
            urls_get.some((item) => item === configUrl) && config.method === 'get' ||
            configUrl === '/services/front_errors/' && !localStorage.getItem('jwt_token')
        ) {
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
HTTP.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        if (err.response) {
            // Access Token was expired
            const originalRequest = err.config;
            if (err.response.status === 401) {
                const userStore = useUserStore();
                try {
                    console.log('here');
                    console.log(originalRequest.url);
                    if (
                        localStorage.getItem('jwt_token') &&
                        originalRequest.url !== '/jwt/refresh/'
                    ) {
                        console.log('here 1');
                        console.log(
                            'refreshTokenPromise',
                            JSON.stringify(refreshTokenPromise) ===
                            JSON.stringify({}),
                            JSON.stringify(refreshTokenPromise.value) ===
                            JSON.stringify({}),
                        );
                        if (
                            JSON.stringify(refreshTokenPromise.value) ===
                            JSON.stringify({})
                        ) {
                            console.log('here 2');
                            if (localStorage.getItem('refresh_token') && localStorage.getItem('refresh_token') !== null) {
                                refreshTokenPromise.value = HTTP.post(
                                    '/jwt/refresh/',
                                    {
                                        refresh:
                                            localStorage.getItem('refresh_token'),
                                    },
                                )
                                    .then((response) => {
                                        console.log('here 3');
                                        localStorage.setItem(
                                            'jwt_token',
                                            response.data.access,
                                        );
                                        refreshTokenPromise.value = {};
                                        originalRequest._retry = true;
                                        return HTTP(originalRequest);
                                    })
                                    .catch(() => {
                                        console.log('here 4');
                                        refreshTokenPromise.value = {};
                                        userStore.logOut();
                                        localStorage.removeItem('jwt_token');
                                        localStorage.removeItem('refresh_token');
                                        localStorage.removeItem('user');
                                        router.push({ name: 'Login' });
                                    });
                            } else {
                                console.log('no refresh token')
                            }

                        } else {
                            console.log('here 5');
                            console.log(
                                'jwt_token',
                                localStorage.getItem('jwt_token'),
                            );
                            setTimeout(() => {
                                if (
                                    localStorage.getItem('jwt_token') !== null
                                ) {
                                    console.log('here 6');
                                    originalRequest._retry = true;
                                    return HTTP(originalRequest);
                                }
                            }, 2000);
                        }
                        // await updateToken();
                    } else {
                        console.log('here 7');
                        userStore.logOut();
                        localStorage.removeItem('jwt_token');
                        localStorage.removeItem('refresh_token');
                        localStorage.removeItem('user');
                        router.push({ name: 'Login' });
                    }
                } catch (error) {
                    console.log('here 8');
                    return Promise.reject(error);
                }

            } else if (err.response.status !== 401 &&
                originalRequest.url !== '/services/front_errors/') {
                const matches_1 = originalRequest.url.match(/regional_competitions\/me\/reports\/\d{1,}\/\d{1,}\//gm);
                const matches_2 = originalRequest.url.match(/regional_competitions\/me\/reports\/\d{1,}\//gm);
                const matches_3 = originalRequest.url.match(/competitions\/\d{1,}\/reports\/q\d{1,}\/(get-place)||(info-static)\//gm);
                const matches_4 = originalRequest.url.match(/detachments\/\d{1,}\/competitions\/1\/place\//gm);
                const matches_5 = originalRequest.url.match(/competitions\/1\/get-place\//gm);
                const matches_6 = originalRequest.url.match(/regional_competitions\/reports\/\d{1,}\/\d{1,}\/(\d{1,})?\/(district_review)?\//gm);
                const matches_7 = originalRequest.url.match(/rsousers\/me\/foreign_parent_documents\//gm);
                const matches_8 = originalRequest.url.match(/statistical_report\/me\//gm);
                const matches_9 = originalRequest.url.match(/competitions\/\d{1,}\/applications\/me/gm);
                const matches_10 = originalRequest.url.match(/regional_competitions\/statistical_report\/me\//gm);
                const matches_11 = originalRequest.url.match(/detachments\/\d{1,}\/members\/\d{1,}\//gm);
                //
                const matches_12 = originalRequest.url.match(/centrals\/\d{1,}\/(leadership)?\//gm);
                const matches_13 = originalRequest.url.match(/rsousers\/\d{1,}\/(commander)||(positions)\//gm);
                const matches_14 = originalRequest.url.match(/save_users\/(\d{1,})||(creation-rs)\//gm);
                const matches_15 = originalRequest.url.match(/regionals\/creation-rs\/(leadership)?\//gm);
                const matches_16 = originalRequest.url.match(/locals\/d{1,}\/(leadership)?\//gm);
                const matches_17 = originalRequest.url.match(/districts\/d{1,}\/(leadership)?\//gm);
                const matches_18 = originalRequest.url.match(/rsousers\/\d{1,}\/positions\//gm);
                const matches_19 = originalRequest.url.match(/regional_competitions\/reports\/\d{1,}\/\d{1,}\//gm)

                //
                const matches = (matches_1 || []).length + (matches_2 || []).length + (matches_3 || []).length + (matches_4 || []).length +
                    (matches_5 || []).length + (matches_6 || []).length + (matches_7 || []).length + (matches_8 || []).length +
                    (matches_9 || []).length + (matches_10 || []).length + (matches_11 || []).length + (matches_12 || []).length +
                    (matches_13 || []).length + (matches_14 || []).length + (matches_15 || []).length + (matches_16 || []).length +
                    (matches_17 || []).length + (matches_18 || []).length + (matches_19 || []).length;

                if (/*(window.location.hostname === 'localhost' ||
                    window.location.hostname === 'rso.sprint.1t' ||
                    window.location.hostname === '213.129.208.147') && */
                    !(err.response.status === 404 && matches > 0)
                ) {
                    HTTP.post('/services/front_errors/', {
                        url: err.config.baseURL.substring(0, err.config.baseURL.length - 1) + err.config.url,
                        error_code: err.response.status,
                        error_description: 'Error: ' + JSON.stringify(err.response.data).slice(0, 90),
                        method: err.config.method
                    }).then().catch()
                }
            }

            if (err.response.status === 403 && err.response.data) {
                console.log('403 err', router);
                // router.push({ name: 'mypage' });
                return Promise.reject(err.response.data);
            }
        }

        return Promise.reject(err);
    },
);

/*const updateToken = async () => {
  try {
    const resp = await HTTP.post('/jwt/refresh/', {
      refresh: localStorage.getItem('refresh_token'),
    });
    if (resp.status === 200) {
      localStorage.setItem('jwt_token', resp.data.access);
    } else {
      const userStore = useUserStore();
      userStore.logOut();
      localStorage.removeItem('jwt_token');
      router.push({ name: 'Login' });
    }
  } catch (e) {
    console.error('Error refreshing token:', e);
    const userStore = useUserStore();
    userStore.logOut();
    localStorage.removeItem('jwt_token');
    router.push({ name: 'Login' });
  }
};*/