import api from './api';

export const fetchUser = id => api.get(`/users/${id}/`);
export const fetchCurrentUser = () => api(`/security/current_user/`);
export const createUser = formData => api.post(`/auth/registration/`, {...formData});
export const login = formData => api.post(`/auth/login/`, {...formData});
export const logoutCurrentUser = () => api.post(`/auth/logout/`);
