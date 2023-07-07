import React, { useState, useContext } from "react";
import { GlobalData } from "../IndexContex";

export function Login() {
  const { setPage, authErrors, filterString, Login, setAuthErrors, globalErrors, setGlobalErrors } = useContext(GlobalData);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  let loginErrors;

  if (authErrors?.action != "user/store") {
    loginErrors = authErrors;
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
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!filterString(email, "email|min:5") && !filterString(password, "min:3")) {
            Login({ password: password, email: email, action: "login" });
          } else {
            setAuthErrors({ error: true, message: "you need to fill all of the field" });
          }
        }}
      >
        <h1 className="tasks__title">Login</h1>
        {loginErrors && <h2 className="error">{loginErrors.message}</h2>}
        {globalErrors?.length > 0 &&
          globalErrors.map((e, key) => (
            <h2
              key={key}
              className="error"
              onClick={() => setGlobalErrors(false)}
            >
              {e.message}
            </h2>
          ))}
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
            className={loginErrors ? "form__input form__error" : "form__input"}
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
            className={loginErrors ? "form__input form__error" : "form__input"}
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
