import React, { useContext, useState } from "react";
import axios from "axios";
import { Auth } from "../IndexContex";
import { error } from "laravel-mix/src/Log";

export function Register() {
  const { setPage, setIsAuth } = useContext(Auth);
  const [genericError, setGenericError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);

  function submit(e) {
    e.preventDefault();
    setErrors([]);
    axios
      .post("/api/user/store", {
        name: name,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
        repeatPassword: repeatPassword,
      })
      .then((r) => {
        if (r.data.type == "field") {
          setGenericError("An error with the field is happen");
          setErrors(r.data.errors);
        } else if ((r.data, error)) {
          setGenericError("An generic error is happen");
        } else {
          localStorage.setItem("token", r.data.token);
          setIsAuth(true);
          setPage("home");
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
        <h1 className="tasks__title">Register</h1>
        {genericError && <h2 className="error">{genericError}</h2>}
        <fieldset className="form__set">
          <label
            htmlFor="name"
            className="form__title"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            className={errors.name ? "form__input form__error" : "form__input"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>

        <fieldset className="form__set">
          <label
            htmlFor="lastname"
            className="form__title"
          >
            Last Name
          </label>
          <input
            id="lastname"
            type="text"
            placeholder="Lastname"
            className={errors.lastname ? "form__input form__error" : "form__input"}
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </fieldset>

        <fieldset className="form__set">
          <label
            htmlFor="username"
            className="form__title"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="UserName"
            className={errors.username ? "form__input form__error" : "form__input"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </fieldset>

        <fieldset className="form__set">
          <label
            htmlFor="email"
            className="form__title"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className={errors.email ? "form__input form__error" : "form__input"}
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
            id="password"
            type="password"
            placeholder="******"
            className={errors.password ? "form__input form__error" : "form__input"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>

        <fieldset className="form__set">
          <label
            htmlFor="repassword"
            className="form__title"
          >
            Repeat Password
          </label>
          <input
            id="repassword"
            type="password"
            placeholder="******"
            className={errors.repeatPassword ? "form__input form__error" : "form__input"}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </fieldset>

        <button
          type="submit"
          className="form__button"
        >
          Register
        </button>
        <a
          className="form__changeLink"
          onClick={() => {
            setPage("login");
          }}
        >
          Login
        </a>
      </form>
    </section>
  );
}
