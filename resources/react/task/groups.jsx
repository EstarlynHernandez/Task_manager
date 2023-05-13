import { Auth } from "../IndexContex";
import React, { useState, useContext } from "react";
import { Group } from "./group";

export function Groups({ groups, updateGroup, updateTask }) {
  const { isMenuOpen, setIsMenuOpen, setIsAuth } = useContext(Auth);
  const [name, setName] = useState("");
  const cgroup = localStorage.getItem("group");

  function create(e) {
    e.preventDefault();
    if (name) {
      setName("");
      updateGroup("create", { name: name });
    }
  }

  function setGroup(e) {
    localStorage.setItem("group", e.target.id);
    updateGroup("check", { id: e.target.id, run: updateTask });
  }

  function logout() {
    localStorage.removeItem("token");
    setIsAuth(false);
    setIsMenuOpen(false);
  }

  return (
    <section
      id="menu"
      className={isMenuOpen ? "menu" : "dnone menu"}
    >
      <div className="userM">
        <div className="userM__user">
          <a
            href="#"
            className="userM__title"
          >
            user Name
          </a>
        </div>
        <div
          className="userM__close closeTab close"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          <p>Close</p>
        </div>
      </div>
      <div className="userG">
        <ul className="listM">
          <li className={cgroup == "daily" ? "listM__item listM__open" : "listM__item"}>
            <p
              id="daily"
              onClick={setGroup}
              className="listM__link"
              href="/"
            >
              Daily Task
            </p>
          </li>

          {groups.map((group) => (
            <Group
              key={group.id}
              group={group}
              setGroup={setGroup}
            />
          ))}
        </ul>
        <form
          onSubmit={create}
          className="form menu__form"
          method="post"
          action="/"
        >
          <h3 className="form__title">Add</h3>

          <fieldset className="form__set">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
              type="text"
              id="gName"
              name="gname"
              className="form__input"
            />
          </fieldset>

          <button
            type="submit"
            className="form__button group__button"
          >
            Create
          </button>
        </form>
      </div>
      <button
        className="listM__logout"
        type="submit"
        onClick={logout}
      >
        logout
      </button>
    </section>
  );
}
