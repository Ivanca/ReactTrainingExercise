import React, { Dispatch, useReducer } from "react";
import { BACKEND_URL } from "./constants";
import { jsonRequest } from "./utils";
const AuthStateContext = React.createContext<typeof initialState | null>(null);
const AuthDispatchContext = React.createContext<Dispatch<any> | null>(null);

export function useAuthState() {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}
 
export function useAuthDispatch() {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }
 
  return context;
}

export const AuthProvider = ({ children }: {children: any}) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);
 
  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

let user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") || "{}").user
  : "";
let token = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") || "{}").accessToken
  : "";
 
export const initialState = {
  user: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null
};
 
export const AuthReducer = (currState: typeof initialState, action: any) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...currState,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...currState,
        user: action.payload.user,
        token: action.payload.accessToken,
        loading: false
      };
    case "LOGOUT":
      return {
        ...currState,
        user: "",
        token: ""
      };
 
    case "LOGIN_ERROR":
      return {
        ...currState,
        loading: false,
        errorMessage: action.error
      };
 
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export async function loginUser(dispatch: any, loginPayload: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
  };
 
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`${BACKEND_URL}/login`, requestOptions);
    let data = await response.json();
 
    if (data.accessToken) {
      let userId = JSON.parse(atob(data.accessToken.split(".")[1])).sub;
      let user = await jsonRequest('GET', `${BACKEND_URL}/users/${userId}`, data.accessToken);
      dispatch({ type: 'LOGIN_SUCCESS', payload: {
        accessToken: data.accessToken,
        user
      } });
      localStorage.setItem('user', JSON.stringify({
        accessToken: data.accessToken,
        data: user
      }));
      return {success: true};
    }
 
    dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error });
  }
}
 
export async function logout(dispatch: any) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('token');
}

