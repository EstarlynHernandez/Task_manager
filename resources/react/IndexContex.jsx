import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

export const GlobalData = createContext();

export function AppContex({ children }) {
  let log = localStorage.getItem("token") ? true : false;
  const [isAuth, setIsAuth] = useState(log);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [page, setPage] = useState("index");
  const [currentGroup, setCurrentGroup] = useState("task");
  const [authErrors, setAuthErrors] = useState("");
  const [globalErrors, setGlobalErrors] = useState();

  useEffect(() => {
    if (globalErrors?.length > 0) {
      setTimeout(() => {
        setGlobalErrors(false);
      }, 10000);
    }
  }, [globalErrors]);

  // return functions and variables
  return (
    <GlobalData.Provider
      value={{
        isAuth,
        setIsAuth,
        isMenuOpen,
        setIsMenuOpen,
        page,
        setPage,
        filterString,
        logout,
        currentGroup,
        setCurrentGroup,
        Login,
        authErrors,
        setAuthErrors,
        globalErrors,
        setGlobalErrors,
      }}
    >
      {children}
    </GlobalData.Provider>
  );

  // filter for dinamic error in a string and number

  // logout
  function logout() {
    localStorage.removeItem("token");
    setIsAuth(false);
    setIsMenuOpen(false);
    setPage("login");
  }

  function Login(user) {
    axios
      .post("/api/" + user.action, {
        password: user.password,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        repeatPassword: user.repeatPassword,
        device: localStorage.getItem("device"),
      })
      .then((r) => {
        if (r.data.error) {
          if (r.data.type == "field") {
            setAuthErrors({ ...r.data.errors, action: user.action });
          } else {
            setAuthErrors({ ...r.data.errors, message: "your email or password are wrong" });
          }
        } else {
          localStorage.setItem("token", r.data.token);
          localStorage.setItem("device", r.data.deviceName);
          setIsAuth(true);
          setAuthErrors("");
          setPage("home");
        }
      })
      .catch((e) => {
        setAuthErrors("Generic Errors");
      });
  }
}

function filterString(string, fill) {
  const filters = fill.split("|");
  let errors = [];

  filters.forEach((filter) => {
    const filterFill = filter.split(":");
    switch (filterFill[0]) {
      case "min":
        if (string.length < filterFill[1]) {
          errors.push(`this field need almost ${filterFill[1]} words`);
        }
        break;
      case "max":
        if (string.length > filterFill[1]) {
          errors.push(`this filed can contain max ${filterFill[1]} words`);
        }
        break;
      case "number":
        if (isNaN(string)) {
          errors.push(`this field can be contain only numbers`);
        } else if (string < 0.1) {
          errors.push(`this field must be greater than 0.1
            `);
        }
        break;
      case "email":
        if (!string.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)) {
          errors.push("This field is not an email");
        }
        break;
      case "same":
        if (string != filterFill[1]) {
          errors.push("This field is not the same that password");
        }
        break;
      case "nullable":
        if (string == null || string.length < 1) {
          errors = false;
        }
        break;
    }
  });

  // return errors
  if (errors.length > 0) {
    return errors;
  } else {
    return false;
  }
}
