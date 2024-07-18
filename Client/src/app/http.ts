import axios from 'axios';
import { useUserStore } from '@features/store';
import router from "./router";
import { ref } from 'vue';



export const HTTP = axios.create({
  //baseURL: 'https://xn--j1ab.xn--d1amqcgedd.xn--p1ai/api/v1/',
  baseURL: 'http://213.139.208.147:30000/api/v1/',
  //baseURL: 'https://rso.sprint.1t.ru/api/v1/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

let refreshTokenPromise = ref({})

HTTP.interceptors.request.use(
  (config) => {
    if (config.url == '/jwt/create/' || config.url == '/register/' || config.url == '/exchange-token/' || config.url == '/jwt/vk-login/' || config.url == '/jwt/verify/' || config.url == '/jwt/refresh/' || config.url == '/regions/' || config.url == '/reset_password/') {
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
        const originalRequest = err.config;
        const userStore = useUserStore();
        try {
          console.log('here')
          console.log(originalRequest.url)
          if (localStorage.getItem('jwt_token') && originalRequest.url !== '/jwt/refresh/') {
            console.log('here 1')
            console.log('refreshTokenPromise', JSON.stringify(refreshTokenPromise) === JSON.stringify({}), JSON.stringify(refreshTokenPromise.value) === JSON.stringify({}))
            if (JSON.stringify(refreshTokenPromise.value) === JSON.stringify({})) {
              console.log('here 2')
              refreshTokenPromise.value = HTTP.post('/jwt/refresh/', {
                refresh: localStorage.getItem('refresh_token'),
              })
                .then((response) => {

                  console.log('here 3')

                  localStorage.setItem('jwt_token', response.data.access);
                  localStorage.setItem('refresh_token', response.data.refresh);
                  refreshTokenPromise.value = {};
                  originalRequest._retry = true;
                  return HTTP(originalRequest);
                })
                .catch(() => {
                  console.log('here 4')
                  refreshTokenPromise.value = {};
                  userStore.logOut();
                  localStorage.removeItem('jwt_token');
                  router.push({ name: 'Login' });
                })
            } else {
              console.log('here 5')
              console.log('jwt_token', localStorage.getItem('jwt_token'))
              setTimeout(() => {
                if (localStorage.getItem('jwt_token') !== null) {
                  console.log('here 6')
                  originalRequest._retry = true;
                  return HTTP(originalRequest);
                }
              }, 2000);
            }
            // await updateToken();
          } else {
            console.log('here 7')
            userStore.logOut();
            localStorage.removeItem('jwt_token');
            router.push({ name: 'Login' });
          }
        } catch (error) {
          console.log('here 8')
          return Promise.reject(error);
        }
      }

      if (err.response.status === 403 && err.response.data) {

        console.log('403 err', router);
        // router.push({ name: 'mypage' });
        return Promise.reject(err.response.data);
      }
    }

    return Promise.reject(err);
  }
);


/*const updateToken = async () => {
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
};*/

