import React, { useState } from "react";

export function Group({group, updateGroup, updateTask, current}) {
  const [mouseX, setMouseX] = useState(0);
  const [newMouseX, setNewMouseX] = useState(0);
  const [left, setLeft] = useState(0);

  // movile move
  function touch(e) {
    setMouseX(e.touches[0].screenX);
  }
  function touchMove(e) {
    if (left > 1) {
      setNewMouseX(0);
    } else {
      setNewMouseX(e.touches[0].screenX - mouseX);
      setLeft(newMouseX);
    }
  }
  function endTouch(e) {
    if (newMouseX < -30) {
      setLeft(-80);
    } else {
      setLeft(0);
    }
  }

  // set Group
  function setGroup(e) {
    updateGroup("check", { id: group.id, run: updateTask });
  }

  function deleteGroup(e) {
    updateGroup("delete", { id: group.id, run: updateTask });
  }

  return (
    <li
      className="listM__item--container"
      key={group.id}
    >
      <div
        className={parseInt(current) == group.id ? "listM__item groupItem listM__open" : "listM__item groupItem"}
        style={{ left: left }}
        onTouchStart={touch}
        onTouchEnd={endTouch}
        onTouchMove={touchMove}
      >
        <p
          id={group.id}
          onClick={setGroup}
          className="listM__link"
        >
          {group.name}
        </p>
      </div>
      <div className="task__delete delete" onClick={deleteGroup}>
        <p>Remove</p>
      </div>
    </li>
  );
}
