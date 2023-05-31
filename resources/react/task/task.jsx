import React, { useEffect, useState } from "react";

export function Task({ task, updateTask }) {
  const [mouseX, setMouseX] = useState(0);
  const [newMouseX, setNewMouseX] = useState(0);
  const [left, setLeft] = useState(0);
  const [value, setValue] = useState(task.value);
  const [interval, stInterval] = useState("interval");

  // move task on mobile for delete
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
    if (newMouseX < -40) {
      setLeft(-100);
    } else {
      setLeft(0);
    }
  }

  // extra functions
  function changeValue() {
    if (task.type == "repeat") {
      if (value < task.count) {
        setValue(value + 1);
        if (value >= task.count - 1) {
          updateTask("check", task);
        }
      }
    } else if (task.type === "time") {
      if (interval == "interval") {
        stInterval(
          setInterval(() => {
            setValue((val) => val - 1);
          }, 1000)
        );
      } else {
        clearInterval(interval);
        stInterval("interval");
      }
    }
  }

  useEffect(() => {
    if (value <= 0 && task.type == "time") {
      clearInterval(interval);
      updateTask("check", task);
    }
  }, [value]);

  return (
    <li
      id="id"
      className={!task.status ? "tasks__list" : "tasks__list task__complete"}
      key={task.id}
    >
      <div
        className="task"
        onTouchStart={touch}
        onTouchEnd={endTouch}
        onTouchMove={touchMove}
        style={{ left: left + "px" }}
      >
        <div
          className="task__checked checked"
          onClick={() => {
            updateTask("check", task);
          }}
        >
          <form
            action=""
            method="post"
          >
            <input
              type="hidden"
              name="id"
              value="id"
            />
          </form>
          <svg
            fill="transparent"
            width="2rem"
            height="2rem"
          >
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              stroke="black"
              strokeWidth="7"
              strokeDasharray="251% 251%"
            />
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              stroke="#fff"
              strokeWidth="3"
              strokeDasharray="251% 251%"
            />
            {task.status && (
              <>
                <line
                  x1="28%"
                  x2="45%"
                  y1="40%"
                  y2="70%"
                  stroke="black"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <line
                  x1="45%"
                  x2="90%"
                  y1="70%"
                  y2="10%"
                  stroke="black"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </>
            )}
          </svg>
        </div>
        <div className="task__info">
          <h3 className="task__title">{task.name.substring(0, 15)}</h3>
          <p className="task__text">{task.details && task.details.substring(0, 20)}</p>
        </div>
        <div
          className="task__time taskExtra {{ $task['type'] }}"
          onClick={changeValue}
        >
          {task.type == "repeat" && (
            <>
              <h3
                className="task__title"
                style={{ textTransform: "capitalize" }}
              >
                Count
              </h3>
              <p className="task__text">
                <span className="task__value value">{value}</span>-<span className="task__limit value-2">{task.count}</span>
              </p>
            </>
          )}
          {task.type == "time" && (
            <>
              <h3
                className="task__title"
                style={{ textTransform: "capitalize" }}
              >
                Remains
              </h3>
              <p className="task__text">
                <span className="task__minutes value">{parseInt((value % 3600) / 60) > 0 && parseInt((value % 86400) / 3600) + "h"}</span>{" "}
                <span className="task__minutes value">{parseInt((value % 3600) / 60) > 0 && parseInt((value % 3600) / 60) + "m"}</span>{" "}
                <span className="task__seconds value-2">{value % 60}</span>s
              </p>
            </>
          )}
        </div>
        <div className="close delete delete-desktop">
          <p
            onClick={() => {
              updateTask("delete", task);
            }}
          >
            Delete
          </p>
        </div>
      </div>
      <div className="task__delete delete">
        <p
          onClick={() => {
            updateTask("delete", task);
          }}
        >
          Remove
        </p>
      </div>
    </li>
  );
}
