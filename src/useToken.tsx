import { useState } from 'react';


export default function useToken() {
    const getToken = () => {
      const tokenString = sessionStorage.getItem('token') || "{}";
      const userToken = JSON.parse(tokenString);
      return userToken?.accessToken
    }
  
    const [token, setToken] = useState(getToken());
  
    const saveToken = (userToken: {[key: string] : string}) => {
      sessionStorage.setItem('token', JSON.stringify(userToken));
      setToken(userToken.accessToken);
    }

    let userId = -1;
    if (token) {
      userId = JSON.parse(atob(token.split(".")[1])).sub;
    }
  
    return {
      setToken: saveToken,
      token,
      userId
    }
}
