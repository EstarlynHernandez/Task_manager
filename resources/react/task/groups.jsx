import { Auth } from "../IndexContex";
import React, { useState, useContext } from "react";
import { useGroup } from "../hooks/useGroups";
import { Group } from "./group";

export function Groups({ updateTask }) {
  const { isMenuOpen, setIsMenuOpen, setIsAuth, isAuth } = useContext(Auth);
  const [name, setName] = useState("");
  const [groups, updateGroup] = useGroup([]);
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
    setPage("login");
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
            >{isAuth ?
              'Daily Task'
              :
              'Local Task'
            }
            </p>
          </li>
          {isAuth &&
            groups.map((group) => (
              <Group
                key={group.id}
                group={group}
                setGroup={setGroup}
              />
            ))}
        </ul>
        {isAuth && (
          <form
            onSubmit={create}
            className="form menu__form"
            method="post"
            action="/"
          >
            <fieldset className="listM__item listM__create">
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Add Group"
                type="text"
                id="gName"
                name="gname"
                className="listM__input"
              />
            </fieldset>
            {name && <button className="form__button listM__button">Add</button>}
          </form>
        )}
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
