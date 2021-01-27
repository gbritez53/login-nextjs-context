import React, {useReducer} from "react";
import jwt_decode from "jwt-decode";
import authReducer from '../reducers/autenticacion.reducer'
import { setCurrentUser } from '../actions/autenticacion.action'
import Cookies from 'js-cookie'

export const AuthGlobal = React.createContext();

let initialState = {
    isAuthenticated: false,
    user: {},
};

const Auth = (props) => {
    const cookie_jwt = Cookies.get('jwt')
    if (cookie_jwt) {
       initialState.isAuthenticated = true;
       initialState.user = jwt_decode(Cookies.get('jwt'));
    }

    const [stateUser, dispatch] = useReducer(authReducer, initialState);

    if (cookie_jwt && stateUser.isAuthenticated === false) {
        const userToken = cookie_jwt ? cookie_jwt : "";
        dispatch(setCurrentUser(jwt_decode(userToken)));
    }

    return (
        <AuthGlobal.Provider
          value={{
            stateUser,
            dispatch,
          }}
        >
          {props.children}
        </AuthGlobal.Provider>
      );
}

export default Auth;