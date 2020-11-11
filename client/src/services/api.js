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

export default api;