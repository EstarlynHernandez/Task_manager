import React, { useContext, useState } from "react";
import { GlobalData } from "../IndexContex";

export function Register() {
  const { setPage, filterString, authErrors, setAuthErrors, Login, globalErrors, setGlobalErrors } = useContext(GlobalData);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [dinamicErrors, setDinamicErrors] = useState([]);

  var registerErrors = {};
  if (authErrors?.action == "user/store") {
    registerErrors = authErrors;
  }

  // set the dinamic errors
  function setValue(set, filter, element) {
    registerErrors[element.name] = false;
    set(element.value);
    let newErrors = dinamicErrors;
    newErrors[element.name] = filterString(element.value, filter);
    setDinamicErrors(newErrors);
  }

  function CreateUser(e) {
    e.preventDefault();
    if (
      !(
        filterString(email, "email|min:3") &
        filterString(name, "max:32|min:3") &
        filterString(username, "max:32|min:3") &
        filterString(lastname, "max:32|min:3") &
        filterString(password, "max:32|min:8") &
        filterString(repeatPassword, "same:" + password, e.target)
      )
    ) {
      Login({
        email: email,
        password: password,
        name: name,
        lastname: lastname,
        username: username,
        repeatPassword: repeatPassword,
        action: "user/store",
      });
    } else {
      console.log(filterString(email, "email|min:3"));
      console.log(filterString(name, "max:32|min:3"));
      console.log(filterString(username, "max:32|min:3"));
      console.log(filterString(lastname, "max:32|min:3"));
      console.log(filterString(password, "max:32|min:8"));
      console.log(filterString(repeatPassword, "same:" + password, e.target));
      setAuthErrors({ action: "user/store" });
    }
  }

  return (
    <section>
      <form
        action="/"
        method="post"
        className="form"
        onSubmit={CreateUser}
      >
        <h1 className="tasks__title">Register</h1>
        {registerErrors.action && <h2 className="error">You need to fill all of the fields correctly</h2>}
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
            className={registerErrors.name || dinamicErrors.name ? "form__input form__error" : "form__input"}
            value={name}
            onChange={(e) => {
              setValue(setName, "max:32|min:3", e.target);
            }}
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
            className={registerErrors.lastname || dinamicErrors.lastname ? "form__input form__error" : "form__input"}
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
            className={registerErrors.username || dinamicErrors.username ? "form__input form__error" : "form__input"}
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
            className={registerErrors.email || dinamicErrors.email ? "form__input form__error" : "form__input"}
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
            className={registerErrors.password || dinamicErrors.password ? "form__input form__error" : "form__input"}
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
            className={registerErrors.repeatPassword || dinamicErrors.repeatPassword ? "form__input form__error" : "form__input"}
            value={repeatPassword}
            name="repeatpassword"
            onChange={(e) => setValue(setRepeatPassword, "same:" + password, e.target)}
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
