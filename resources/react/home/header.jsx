import React, { useContext } from "react";
import { Auth } from "../IndexContex";

export function Header() {
  const { isAuth } = useContext(Auth);
  return (
    <header>
      <div className="header">
        <picture>
          <img
            src="icons/logo.svg"
            alt="Estyos Task"
          />
        </picture>
        {isAuth ? (
          <>
            <div
              className="menuI"
              id="openMenu"
            >
              <img
                src="icons/menu.svg"
                alt="Menu"
              />
            </div>
            <p className="menu_button only__desktop">Logout</p>
          </>
        ) : (
          <p className="menu_button">Login</p>
        )}
      </div>
    </header>
  );
}
