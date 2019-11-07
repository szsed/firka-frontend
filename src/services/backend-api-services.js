const API = 'http://localhost:4000';

const addTokenToHeaders = params => {
  const token = localStorage.getItem('token');
  const modifiedParams;
  if (params) {
    if (params.headers) {
      modifiedParams = {
        ...params,
        headers: {
          ...headers,
          token,
        }
      }
    } else {
      modifiedParams = {
        modifiedParams = {
          ...params,
          headers: {
            token,
          }
        }
      }
    }
  } else {
    modifiedParams = {
      headers: {
        token,
      }
    }
  }
  return modifiedParams;
};

export const requestToAPI = (endpoint, params) => {
  const paramsWithJWT = addTokenToHeaders(params);
  return fetch(`${API}${endpoint}`, paramsWithJWT);
};
