import axios from 'axios';
export const HTTP = axios.create({
    //  baseURL: 'https://xn--j1ab.xn--d1amqcgedd.xn--p1ai/api/v1/',
     baseURL: 'https://rso.sprint.1t.ru/api/v1/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

HTTP.interceptors.request.use(
    (config) => {

        if (config.url == '/jwt/create/' || config.url == '/register/' || config.url == '/exchange-token/' || config.url == '/jwt/vk-login/' || config.url == '/jwt/verify/' || config.url == '/jwt/refresh/' || config.url == '/regions/') {
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
      const originalConfig = err.config;
        await verifyToken()
      if (err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            await updateToken();
            return HTTP(originalConfig);
          } catch (error) {
            return Promise.reject(error);
          }
        }

        if (err.response.status === 403 && err.response.data) {

          return Promise.reject(err.response.data);
        }
      }

      return Promise.reject(err);
    }
  );

  const verifyToken = async () => {
    try {
        const resp = await HTTP.post('/jwt/verify/', {
            token: localStorage.getItem('jwt_token'),
        });
        console.log(resp.data);


    } catch (error) {
        console.log(error);
    }
};

  const updateToken = async () => {
    try {
        const resp = await HTTP.post('/jwt/refresh/', {
            refresh: localStorage.getItem('refresh_token'),
        });
        localStorage.setItem('jwt_token', resp.data.access);
        localStorage.setItem('refresh_token', resp.data.refresh);
    } catch (e) {
        console.error('Error refreshing token:', e);
    }
};

