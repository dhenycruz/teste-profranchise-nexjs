import { createContext } from "react";
const { login } = require('../services/api-franchise');
import React, { useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [errorLogin, setErrorLogin] = useState(null);
  
  const signIN = async (date) => {
    try {
      const response = await login(date);
      return response;
    } catch (error) {
      if (error.response) {
        // A requisição foi feita e o servidor respondeu com um código de status
        // que sai do alcance de 2xx
        setErrorLogin(error.response.data.message);
      }
    }
  };

  return (
    <AuthContext.Provider value={{  isLogged, signIN, errorLogin, setErrorLogin }}>
      { children }
    </AuthContext.Provider>
  )
};