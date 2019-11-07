const API = 'http://localhost:3000';

export const requestToAPI = (endpoint, params) => {
  return fetch(`${API}${endpoint}`, params)
};
