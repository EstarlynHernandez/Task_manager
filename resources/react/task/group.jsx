import React, { useState, useEffect, useContext } from "react";
import { GlobalData } from "../IndexContex";

export function Group({ group, updateGroup, updateTask, loading, groupLoading, isEdit, setIsEdit }) {
  const { currentGroup } = useContext(GlobalData);
  const [mouseX, setMouseX] = useState(0);
  const [newMouseX, setNewMouseX] = useState(0);
  const [left, setLeft] = useState(0);
  const [name, setName] = useState(group.name);

  useEffect(() => {
    setLeft(0);
    setNewMouseX(0);
  }, [currentGroup]);

  // movile move for edid and delete
  function touch(e) {
    setMouseX(e.touches[0].screenX - left);
  }
  function touchMove(e) {
    setNewMouseX(e.touches[0].screenX - mouseX);
    setLeft(newMouseX);
  }
  function endTouch(e) {
    if (newMouseX < -60) {
      setLeft(-100);
    } else if (newMouseX > 60) {
      setLeft(100);
    } else {
      setLeft(0);
    }
  }

  // rename group
  function renameGroup() {
    console.log("Work In progress");
  }

  // remove loading animation
  function runSet() {
    updateTask("update");
    loading(false);
    setIsEdit(false);
  }

  // create a new group
  function newGroup(e) {
    e.preventDefault();
    updateGroup("edit", { name: name, id: group.id, run: runSet });
  }

  // change Group selected
  function setGroup(e) {
    loading(group.id);
    updateGroup("check", { id: group.id, run: runSet });
  }

  // remove group
  function deleteGroup(e) {
    loading(group.id);
    updateGroup("delete", { id: group.id, run: runSet });
  }

  // update group
  function editGroup(e) {
    loading(group.id);
    updateGroup("edit", { id: group.id, name: name, run: runSet });
  }

  return (
    <li
      className={"listM__item--container "}
      key={group.id}
    >
      <div className={"group--container " + (groupLoading == group.id && "loading")}>
        <div
          className={parseInt(currentGroup) == group.id ? "listM__item groupItem listM__open" : "listM__item groupItem"}
          style={{ left: left }}
          onTouchStart={touch}
          onTouchEnd={endTouch}
          onTouchMove={touchMove}
        >
          {/* check grouo status (edit or not) */}
          {isEdit ? (
            <form onSubmit={(e) => newGroup(e)}>
              <input
                type="text"
                className="listM__link listM--textlimit form__input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </form>
          ) : (
            <p
              id={group.id}
              onClick={setGroup}
              className="listM__link listM--textlimit"
              title={group.name}
            >
              {group.name.substring(0, 15)}
              {group.name.length > 15 && "..."}
            </p>
          )}
          <div className={"d-group delete-desktop " + (isEdit ? "edit__button" : "delete ")}>
            {isEdit ? <p onClick={editGroup}>Save</p> : <p onClick={deleteGroup}>Remove</p>}
          </div>
        </div>
        <div className="task__delete task__del-edit delete">
          <p onClick={renameGroup}>Edit</p>
          <p onClick={deleteGroup}>Remove</p>
        </div>
      </div>
      {groupLoading == group.id && (
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
  );
}
