import React, { useState, createContext } from "react";

export const Auth = createContext();

export function User({ children }) {
  let log = localStorage.getItem("token") ? true : false;
  const [isAuth, setIsAuth] = useState(log);
  return <Auth.Provider value={{ isAuth, setIsAuth }}>{children}</Auth.Provider>;
}
