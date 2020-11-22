import api from './api';

export const fetchSnippetsService = () => api.get('/snippets/owned/');
export const fetchPaginatedSnippetsService = page => api.get(`/snippets/?page=${page}`);
export const fetchSnippetService = id => api.get(`/snippets/owned/${id}/`);
export const createSnippetService = formData => api.post(`/snippets/owned/`, {...formData});
export const updateSnippetService = formData => api.put(`/snippets/owned/${formData.id}/`, {...formData});
export const deleteSnippetService = id => api.delete(`/snippets/owned/${id}/`);

export const fetchPublicSnippetsService = () => api.get('/snippets/');
