import api from './api';

export const fetchUser = id => api.get(`/users/${id}`);
export const fetchCurrentUser = userId => api(`/auth/current_user/${userId}`);
export const createUser = formData => api.post(`/auth/signup`, {...formData});
export const login = formData => api.post(`/auth/signin`, {...formData});
export const logoutCurrentUser = () => api.get(`/auth/logout`);
