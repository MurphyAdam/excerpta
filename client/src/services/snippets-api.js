import api from './api';

export const fetchSnippetsService = () => api.get('/snippets');
export const fetchPaginatedSnippetsService = page => api.get(`/snippets/?page=${page}`);
export const fetchSnippetService = id => api.get(`/snippets/${id}`);
export const createSnippetService = formData => api.post(`/snippets`, {...formData});
export const updateSnippetService = formData => api.put(`/snippets/${formData.id}`, {...formData});
export const deleteSnippetService = id => api.delete(`/snippets/${id}`);

