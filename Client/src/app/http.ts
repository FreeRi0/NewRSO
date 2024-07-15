import axios from 'axios';
import { useUserStore } from '@features/store';
import router from "./router";


export const HTTP = axios.create({
  baseURL: 'https://xn--j1ab.xn--d1amqcgedd.xn--p1ai/api/v1/',
  // baseURL: 'https://rso.sprint.1t.ru/api/v1/',

  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});


HTTP.interceptors.request.use(
  (config) => {
    if (config.url == '/jwt/create/' || config.url == '/register/' || config.url == '/exchange-token/' || config.url == '/jwt/vk-login/' || config.url == '/jwt/verify/' || config.url == '/jwt/refresh/' || config.url == '/regions/' || config.url == '/reset_password/' || config.url == '/users/reset_password_confirm/' || config.url == 'competitions/download_regulation_file/') {

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
      if (err.response.status === 401) {
        try {
          if (localStorage.getItem('jwt_token') !== null) {
            await updateToken();
          } else {
            router.push({ name: 'Login' });
          }
        } catch (error) {
          return Promise.reject(error);
        }
      }

      if (err.response.status === 403 && err.response.data) {

        console.log('403 err', router);
        router.push({ name: 'mypage' });
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);


const updateToken = async () => {
  try {
    const resp = await HTTP.post('/jwt/refresh/', {
      refresh: localStorage.getItem('refresh_token'),
    });
    if (resp.status === 200) {
      localStorage.setItem('jwt_token', resp.data.access);
      localStorage.setItem('refresh_token', resp.data.refresh);
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
};

