import api from './api';

export const fetchUser = id => api.get(`/users/${id}/`);
export const fetchCurrentUser = userId => api(`/auth/current_user/${userId}/`);
export const createUser = formData => api.post(`/auth/registeration/`, {...formData});
export const login = formData => api.post(`/auth/login/`, {...formData});
export const logoutCurrentUser = () => api.get(`/auth/logout/`);
