import { LOGIN, LOGOUT } from "./types"

export const loginUserAction = userData => ({
  type: LOGIN,
  payload: userData,
});

export const logoutUserAction = () => ({
  type: LOGOUT,
});
