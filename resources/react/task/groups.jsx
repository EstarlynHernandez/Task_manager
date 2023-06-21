import { Auth } from "../IndexContex";
import React, { useState, useContext, useEffect } from "react";
import { useGroup } from "../hooks/useGroups";
import { Group } from "./group";

export function Groups({ updateTask, setTasksLoading }) {
  const { isMenuOpen, setIsMenuOpen, setIsAuth, isAuth } = useContext(Auth);
  const [name, setName] = useState("");
  const [groups, updateGroup, current] = useGroup([]);
  const [groupNameError, setGroupNameError] = useState(false);
  const [groupLoading, setGroupLoading] = useState(false);

  function create(e) {
    e.preventDefault();
    if (name.length > 2) {
      setName("");
      loading("all");
      updateGroup("create", { name: name, run: runSet });
    }
  }

  function setGroup(e) {
    setGroupLoading(e.target.id);
    setTasksLoading(true);
    updateGroup("check", { id: e.target.id, run: runSet });
  }

  function logout() {
    localStorage.removeItem("token");
    setIsAuth(false);
    setIsMenuOpen(false);
    setPage("login");
  }

  function newGroup(e) {
    if ((e.target.value.length < 1) | (e.target.value.length > 2)) {
      setGroupNameError(false);
    } else {
      setGroupNameError(true);
    }
    setName(e.target.value);
  }

  function loading(group) {
    if (group) {
      setGroupLoading(group);
      setTasksLoading(true);
    } else {
      setTimeout(() => {
        setGroupLoading(group);
        setTasksLoading(false);
      }, 400);
    }
  }

  function runSet() {
    updateTask("update");
    loading(false);
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
      <div className={"userG"}>
        <ul className={"listM " + (groupLoading == "all" ? "loading" : "")}>
          <li className={current == "daily" ? "listM__item listM__open " : "listM__item "}>
            <p
              id="daily"
              onClick={setGroup}
              className={"listM__link " + (groupLoading == "daily" && "loading")}
              href="/"
            >
              {isAuth ? "Task" : "Local Task"}
            </p>
            {groupLoading == "daily" && (
              <div className="groupLoading--icon">
                <svg
                  fill="transparent"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx={50}
                    cy={50}
                    r={40}
                    stroke="white"
                    strokeLinecap="round"
                    strokeDasharray="140 251"
                    strokeWidth="1rem"
                  />
                </svg>
              </div>
            )}
          </li>
          {isAuth &&
            groups.map((group) => (
              <Group
                key={group.id}
                group={group}
                updateTask={updateTask}
                updateGroup={updateGroup}
                current={current}
                loading={loading}
                groupLoading={groupLoading}
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
                onChange={newGroup}
                placeholder="Add Group"
                type="text"
                id="gName"
                name="gname"
                className={"listM__input " + (groupNameError && "error")}
              />
            </fieldset>
            {groupNameError && <p className="error__text">Group name need 3 or most words</p>}
            {name.length > 2 && <button className="form__button listM__button">Add</button>}
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
