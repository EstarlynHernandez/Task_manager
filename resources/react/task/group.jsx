import React, { useState, useEffect } from "react";

export function Group({ group, updateGroup, loading, groupLoading, isGroupEdit, activeGroup, refreshAll }) {
  const [mouseX, setMouseX] = useState(0);
  const [newMouseX, setNewMouseX] = useState(0);
  const [left, setLeft] = useState(0);
  const [name, setName] = useState(group.name);

  useEffect(() => {
    setLeft(0);
    setNewMouseX(0);
  }, [activeGroup]);

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

  // change Group selected
  function setGroup(e) {
    if (activeGroup != group.id) {
      loading(group.id);
      updateGroup("check", { id: group.id, run: refreshAll });
    }
  }

  // remove group
  function deleteGroup(e) {
    loading(group.id);
    updateGroup("delete", { id: group.id, run: refreshAll });
  }

  // update group
  function editGroup(e) {
    if (name.length < 3) {
      e.preventDefault();
      loading(group.id);
      updateGroup("edit", { id: group.id, name: name, run: refreshAll });
    }
  }

  return (
    <li
      className={"listM__item--container "}
      key={group.id}
    >
      <div className={"group--container " + (groupLoading == group.id && "loading")}>
        <div
          className={parseInt(activeGroup) == group.id ? "listM__item groupItem listM__open" : "listM__item groupItem"}
          style={{ left: left }}
          onTouchStart={touch}
          onTouchEnd={endTouch}
          onTouchMove={touchMove}
        >
          {/* check grouo status (edit or not) */}
          {isGroupEdit ? (
            <form onSubmit={(e) => editGroup(e)}>
              <input
                type="text"
                className={"listM__link listM--textlimit form__input " + (name.length < 3 && "error__text")}
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
          <div className={"d-group delete-desktop " + (isGroupEdit && name?.length >= 3 ? "edit__button" : "delete ")}>
            {isGroupEdit ? <p onClick={editGroup}>Save</p> : <p onClick={deleteGroup}>Remove</p>}
          </div>
        </div>
        <div className="task__delete task__del-edit delete">
          <p>Edit</p>
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
