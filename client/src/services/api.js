import axios from 'axios';
import { getCookie } from '../util/Cookies';

// window origin - base url
const API_ENDPOINT = `${window.location.origin}/api`;

const api = axios.create({
    baseURL: API_ENDPOINT,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFTOKEN',
    withCredentials: true
});

// Use interceptor to inject the token to requests
api.interceptors.request.use(request => {
    request.headers['X-CSRFTOKEN'] = getCookie('csrftoken');
    return request;
});

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Return any error which is not due to authentication back to the calling service
    if (error.response.status !== 403) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    // Logout user if token refresh didn't work or user is disabled
    if (error.config.url === '/security/get-csrf/') {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    // Try request again with new token
    return api.get('/security/get-csrf/')
      .then((response) => {

        // New request with new token
        const config = error.config;
        config.headers['X-CSRFTOKEN'] = response.data.csrftoken;

        return new Promise((resolve, reject) => {
          api.request(config).then(response => {
            resolve(response);
          }).catch((error) => {
            reject(error);
          })
        });

      })
      .catch((error) => {
      	Promise.reject(error);
      });
}
);


export default api;