import React, { useState, useContext } from "react";
import { GlobalData } from "../IndexContex";
import { Group } from "./group";

export function Groups({ updateTask, setTasksLoading, groups, updateGroup }) {
  const { isMenuOpen, setIsMenuOpen, logout, isAuth } = useContext(GlobalData);
  const [name, setName] = useState("");
  const [groupNameError, setGroupNameError] = useState(false);
  const [groupLoading, setGroupLoading] = useState(false);
  const [isGroupEdit, setIsGroupEdit] = useState(false);

  // remove loading animation and refresh task
  function refreshAll() {
    updateTask("update");
    loading(false);
    setIsGroupEdit(false);
  }

  // create a new group
  function create(e) {
    e.preventDefault();
    if (name.length > 2) {
      updateGroup("create", { name: name, run: refreshAll });
      loading("all");
      setName("");
      setIsGroupEdit(false);
    }
  }

  // set active Group
  function setGroup(e) {
    if (groups.active != e.target.id) {
      setGroupLoading(e.target.id);
      setTasksLoading(true);
      updateGroup("check", { id: e.target.id, run: refreshAll });
    }
  }

  // check the new group text is correct
  function newGroup(e) {
    if ((e.target.value.length < 1) | (e.target.value.length > 2)) {
      setGroupNameError(false);
    } else {
      setGroupNameError(true);
    }
    setName(e.target.value);
  }

  // set loading animation
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

  return (
    <section
      id="menu"
      className={isMenuOpen ? "menu" : "dnone menu"}
    >
      {/* edit all group name */}
      {isAuth && (
        <div className="group__header only__desktop">
          <p className="task__title">Groups</p>
          <p
            className="edit__button"
            onClick={() => {
              setIsGroupEdit(!isGroupEdit);
            }}
          >
            {isGroupEdit ? "Cancel" : "Edit"}
          </p>
        </div>
      )}
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
          <li className={groups.active == "task" ? "listM__item listM__open " : "listM__item "}>
            <p
              id="task"
              onClick={setGroup}
              className={"listM__link " + (groupLoading == "task" && "loading")}
              href="/"
            >
              {isAuth ? "Task" : "Local Task"}
            </p>
            {groupLoading == "task" && (
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
          {isAuth && (
            <>
              <li className={groups.active == "daily" ? "listM__item listM__open " : "listM__item "}>
                <p
                  id="daily"
                  onClick={setGroup}
                  className={"listM__link " + (groupLoading == "daily" && "loading")}
                  href="/"
                >
                  Daily Task
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

              <li className={groups.active == "date" ? "listM__item listM__open " : "listM__item "}>
                <p
                  id="date"
                  onClick={setGroup}
                  className={"listM__link " + (groupLoading == "date" && "loading")}
                  href="/"
                >
                  Task by Date
                </p>
                {groupLoading == "date" && (
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

              {/* show all groups */}
              {groups.all.map((group) => (
                <Group
                  key={group.id}
                  group={group}
                  updateTask={updateTask}
                  updateGroup={updateGroup}
                  loading={loading}
                  groupLoading={groupLoading}
                  isGroupEdit={isGroupEdit}
                  activeGroup={groups.active}
                  refreshAll={refreshAll}
                />
              ))}
            </>
          )}
        </ul>
        
        {/* create new group */}
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
