import React, { useState } from "react";
import axios from "axios";

export function Login() {
    const [genericError, setGenericError] = useState("");
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
                    <label htmlFor="email" className="form__title">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="form__input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </fieldset>

                <fieldset className="form__set">
                    <label htmlFor="password" className="form__title">
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

                <button type="submit" className="form__button">
                    Login
                </button>
                <a className="form__changeLink" href="/">
                    Register
                </a>
            </form>
        </section>
    );
}
