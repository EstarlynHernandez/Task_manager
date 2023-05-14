import React, { useState, createContext } from "react";

export const Auth = createContext();

export function User({ children }) {
  let log = localStorage.getItem("token") ? true : false;
  const [isAuth, setIsAuth] = useState(log);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [page, setPage] = useState("index");

  return <Auth.Provider value={{ isAuth, setIsAuth, isMenuOpen, setIsMenuOpen, page, setPage }}>{children}</Auth.Provider>;
}
