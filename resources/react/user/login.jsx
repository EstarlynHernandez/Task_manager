import React, { useState, useContext } from "react";
import { Auth } from "../IndexContex";
import axios from "axios";

export function Login() {
  const [genericError, setGenericError] = useState("");
  const { setPage, setIsAuth } = useContext(Auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submit(e) {
    e.preventDefault();
    axios
      .post("/api/login", {
        password: password,
        email: email,
      })
      .then((r) => {
        if (r.data.error) {
          if (r.data.type == "field") {
            setGenericError("You need to fill in all the fields");
          } else {
            setGenericError("Your email or password is incorrect");
          }
        } else {
          localStorage.setItem("token", r.data.token);
          setIsAuth(true);
          setPage('home');
        }
      })
      .catch((e) => {
        setGenericError("Generic Error");
      });
  }

  return (
    <section>
      <form
        action="/"
        method="post"
        className="form"
        onSubmit={(e) => {
          submit(e);
        }}
      >
        <h1 className="tasks__title">Login</h1>
        {genericError && <h2 className="error">{genericError}</h2>}
        <fieldset className="form__set">
          <label
            htmlFor="email"
            className="form__title"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="form__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>

        <fieldset className="form__set">
          <label
            htmlFor="password"
            className="form__title"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="form__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>

        <button
          type="submit"
          className="form__button"
        >
          Login
        </button>
        <p
          className="form__changeLink"
          onClick={() => {
            setPage("register");
          }}
        >
          Register
        </p>
      </form>
    </section>
  );
}