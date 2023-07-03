import React, { useContext, useState } from "react";
import axios from "axios";
import { GlobalData } from "../IndexContex";

export function Register() {
  const { setPage, setIsAuth, filterString } = useContext(GlobalData);
  const [genericError, setGenericError] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [dinamicErrors, setDinamicErrors] = useState([]);

  // create user function
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
        device: localStorage.getItem('device'),
      })
      .then((r) => {
        if (r.data.type == "field") {
          setGenericError("An error with the field is happen");
          setErrors(r.data.errors);
        } else if (r.data.error) {
          setGenericError("An generic error is happen");
        } else {
          localStorage.setItem("token", r.data.token);
          localStorage.setItem('device', r.data.deviceName),
          setIsAuth(true);
          setPage("home");
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
    setDinamicErrors(newErrors);
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
        {/* show an generic from server error */}
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
            name="name"
            placeholder="Your Name"
            className={errors.name ? "form__input form__error" : "form__input"}
            value={name}
            onChange={(e) => setValue(setName, "max:32|min:3", e.target)}
          />
        {/* show an error */}
          {dinamicErrors.name &&
            dinamicErrors.name.map((e) => (
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
            htmlFor="lastname"
            className="form__title"
          >
            Last Name
          </label>
          <input
            id="lastname"
            type="text"
            name="lastname"
            placeholder="Lastname"
            className={errors.lastname ? "form__input form__error" : "form__input"}
            value={lastname}
            onChange={(e) => setValue(setLastname, "max:32|min:3", e.target)}
          />
        {/* show an error */}
          {dinamicErrors.lastname &&
            dinamicErrors.lastname.map((e) => (
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
            name="username"
            onChange={(e) => setValue(setUsername, "max:32|min:3", e.target)}
          />
        {/* show an error */}
          {dinamicErrors.username &&
            dinamicErrors.username.map((e) => (
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
            htmlFor="email"
            className="form__title"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            className={errors.email ? "form__input form__error" : "form__input"}
            value={email}
            onChange={(e) => setValue(setEmail, "max:32|min:3|email", e.target)}
          />
        {/* show an error */}
          {dinamicErrors.email &&
            dinamicErrors.email.map((e) => (
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
            id="password"
            type="password"
            placeholder="******"
            name="password"
            className={errors.password ? "form__input form__error" : "form__input"}
            value={password}
            onChange={(e) => setValue(setPassword, "max:32|min:8", e.target)}
          />
        {/* show an error */}
          {dinamicErrors.password &&
            dinamicErrors.password.map((e) => (
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
            name="repeatpassword"        
            onChange={(e) => setValue(setRepeatPassword, 'same:' + password, e.target)}
          />
        {/* show an error */}
          {dinamicErrors.repeatpassword &&
            dinamicErrors.repeatpassword.map((e) => (
              <p
                className="error__text"
                key={e}
              >
                {e}
              </p>
            ))}
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
