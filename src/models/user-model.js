import { requestToAPI } from "../services/backend-api-services";
import store from "../store/store";

export const registerUser = (userData) => {
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
      localStorage.setItem('token', parsed.token);
      store.dispatch({ type: 'LOGIN', payload: parsed });
      return parsed;
    })
    .catch(err => console.log(err));
}

export const loginUser = (username, password) => {
  return APIServices.requestToAPI('/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
    })
  })
    .then(response => response.json())
    .then(parsed => {
      localStorage.setItem('token', parsed.token);
      store.dispatch({ type: 'LOGIN', payload: parsed });
      return parsed;
    })
    .catch(err => console.log(err));
};

export const logoutUser = () => {
  localStorage.setItem('token', null);
  store.dispatch({ type: 'LOGOUT' });
}