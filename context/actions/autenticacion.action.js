import Cookies from 'js-cookie'
export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

export const logoutUser = (dispatch) => {
  Cookies.remove('jwt');
  dispatch(setCurrentUser({}));
};