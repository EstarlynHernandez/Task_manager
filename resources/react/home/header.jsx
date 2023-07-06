import React, { useContext } from "react";
import { GlobalData } from "../IndexContex";

export function Header() {
  const { isAuth, setIsMenuOpen, setPage, logout } = useContext(GlobalData);

  return (
    // header
    <header>
      <div className="header">
        <picture
          onClick={() => {
            setPage("home");
          }}
        >
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
                onClick={() => {
                  setIsMenuOpen(true);
                }}
              />
            </div>
            <p
              className="menu__button only__desktop"
              onClick={logout}
            >
              Logout
            </p>
          </>
        ) : (
          <p
            className="menu__button"
            onClick={() => {
              setPage("login");
            }}
          >
            Login
          </p>
        )}
      </div>
    </header>
  );
}
