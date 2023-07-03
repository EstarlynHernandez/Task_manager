import React, { useState, useContext } from "react";
import { GlobalData } from "../IndexContex";
import axios from "axios";

export function Login() {
  const [genericError, setGenericError] = useState("");
  const { setPage, setIsAuth, filterString } = useContext(GlobalData);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  // login function
  function submit(e) {
    e.preventDefault();
    axios
      .post("/api/login", {
        password: password,
        email: email,
        device: localStorage.getItem('device'),
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
          setPage("home");
          localStorage.setItem('device', r.data.deviceName);
        }
      })
      .catch((e) => {
        setGenericError("Generic Error");
      });
  }

  // set the dinamic errors
  function setValue(set, filter, element) {
    set(element.value);
    let newErrors = errors;
    newErrors[element.name] = filterString(element.value, filter);
    setErrors(newErrors);
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
            name="email"
            onChange={(e) => setValue(setEmail, "email|min:5", e.target)}
          />
          {errors.email &&
            errors.email.map((e) => (
              <p
                className="error__text"
                key={e}
              >
                {e}
              </p>
            ))}
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
            onChange={(e) => setValue(setPassword, "min:3", e.target)}
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
