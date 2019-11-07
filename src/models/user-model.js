import { requestToAPI } from "../services/backend-api-services";
import store from "../store/store";

export const registerUser = (userData) => {
  console.log(userData);
  return requestToAPI('/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...userData })
  })
    .then(response => response.json())
    .then(parsed => {
      if (parsed.message) throw parsed.message;
      localStorage.setItem('token', parsed.token);
      store.dispatch({ type: 'LOGIN', payload: parsed });
      return parsed;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
}

export const loginUser = (username, password) => {
  return requestToAPI('/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then(response => response.json())
    .then(parsed => {
      if (parsed.message) throw parsed;
      localStorage.setItem('token', parsed.token);
      store.dispatch({ type: 'LOGIN', payload: parsed });
      return parsed;
    })
    .catch(err => {
      console.log(err.message);
      return err;
    });
};

export const loginWithJWTOnLoad = () => {
  const token = localStorage.getItem('token')
  if (!token) return;
  return requestToAPI('/refresh', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token,
    }),
  })
    .then(response => response.json())
    .then(parsed => {
      if (parsed.message) throw parsed;
      localStorage.setItem('token', parsed.token);
      store.dispatch({ type: 'LOGIN', payload: parsed });
      return parsed;
    })
    .catch(err => {
      console.log(err.message);
      return err;
    });
};

export const logoutUser = () => {
  localStorage.setItem('token', null);
  store.dispatch({ type: 'LOGOUT' });
}