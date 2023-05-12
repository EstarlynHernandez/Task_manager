import React, { useState } from "react";

export function Group({ groups, updateGroup, updateTask }) {
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
    updateGroup("check", { id: e.target.id, run:  updateTask});
  }

  return (
    <section
      id="menu"
      className="menu dnone"
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
        <div className="userM__close closeTab close">
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
            <li
              className="listM__item--container"
              key={group.id}
            >
              <div className={cgroup == group.id ? "listM__item groupItem listM__open" : "listM__item groupItem"}>
                <p
                  id={group.id}
                  onClick={setGroup}
                  className="listM__link"
                >
                  {group.name}
                </p>
              </div>
              <div className="task__delete delete">
                <p>Remove</p>
              </div>
            </li>
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
      <form
        action="/"
        method="post"
      >
        <button
          className="listM__logout"
          type="submit"
        >
          logout
        </button>
      </form>
    </section>
  );
}
