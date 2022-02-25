import { createContext } from "react";
import { useState } from "react";
import { setCookie } from "nookies";
import Router from "next/router";

const { login } = require('../services/api-franchise');

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [errorLogin, setErrorLogin] = useState(null);
  
  const signIN = async (date) => {
    try {
      const response = await login(date);
      const { authorization: token } = response.headers;
      const { name } = response.data;
      console.log(token);

      setCookie(undefined, 'nextToken', token, { maxAge: 60 * 60 * 1 /* 1 hora*/ });
      setCookie(undefined, 'userName', name, { maxAge: 60 * 60 * 1 /* 1 hora*/ });

      setErrorLogin(null);

      Router.push('/dashboard')
    } catch (error) {
      if (error.response) {
        // A requisição foi feita e o servidor respondeu com um código de status
        // que sai do alcance de 2xx
        setErrorLogin(error.response.data.message);
      }
    }
  };

  return (
    <AuthContext.Provider value={{  isLogged, errorLogin, signIN}}>
      { children }
    </AuthContext.Provider>
  )
};
