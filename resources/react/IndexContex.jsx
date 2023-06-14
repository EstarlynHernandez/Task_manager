import React, { useState, createContext } from "react";

export const Auth = createContext();

export function User({ children }) {
  let log = localStorage.getItem("token") ? true : false;
  const [isAuth, setIsAuth] = useState(log);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [page, setPage] = useState("index");

  return <Auth.Provider value={{ isAuth, setIsAuth, isMenuOpen, setIsMenuOpen, page, setPage, filterString }}>{children}</Auth.Provider>;

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
      }
    });

    if (errors.length > 0) {
      return errors;
    } else {
      return false;
    }
  }
}
