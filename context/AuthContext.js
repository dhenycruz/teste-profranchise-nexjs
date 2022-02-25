import { createContext } from "react";

export const AuthContext = createContext({});

export const AuthProvider = (children) => {
  const isLogged = true;
  
  const signIN = async () => {
  };
  
  return (
    <AuthContext.Provider value={{  isLogged }}>
      { children }
    </AuthContext.Provider>
  )
};