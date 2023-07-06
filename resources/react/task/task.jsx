import React, { useEffect, useState } from "react";

export function Task({ task, updateTask, setTasksLoading, modifyTask }) {
  const [mouseX, setMouseX] = useState(0);
  const [newMouseX, setNewMouseX] = useState(0);
  const [left, setLeft] = useState(0);
  const [value, setValue] = useState(parseInt(task.value));
  const [interval, addInterval] = useState("interval");
  const [isMobile] = useState(checkIsMob());

  useEffect(() => {
    setValue(parseInt(task.value));
  }, [task.value]);

  function checkIsMob() {
    if (window.screen.width < 800) {
      return true;
    }
    return false;
  }

  // move task on mobile for delete
  function touch(e) {
    if (parseInt(e.target.style.left) != 0) {
      setMouseX(e.touches[0].screenX - parseInt(e.target.style.left));
    } else {
      setMouseX(e.touches[0].screenX);
    }
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

  // save value for count and time
  function saveValue() {
    var item = [];
    item.value = value;
    item.id = task.id;
    updateTask("value", item);
  }

  // save count and time for tasks
  function changeValue() {
    if (!task.status) {
      if (task.type == "repeat") {
        if (value < task.count) {
          saveValue();
          setValue(value + 1);
          if (value >= task.count - 1) {
            check();
          }
        }
      } else if (task.type === "time") {
        if (interval == "interval" && value > 0) {
          addInterval(
            setInterval(() => {
              setValue((val) => val - 1);
            }, 1000)
          );
        } else {
          clearInterval(interval);
          saveValue();
          addInterval("interval");
        }
      }
    }
  }

  // stop interval when is paused or finished
  useEffect(() => {
    if (value <= 0 && task.type == "time") {
      clearInterval(interval);
      saveValue();
      check();
    }
  }, [value]);

  // set task on complete or uncomplete
  function check() {
    updateTask("check", task);
    if (task.status) {
      if (task.type == "repeat") {
        setValue(0);
      } else if (task.type == "time") {
        setValue(task.count);
      }
    }
    clearInterval(interval);
    addInterval("interval");
  }

  // remove task
  function deleteTask(task) {
    setTasksLoading(true);
    task.run = setTasksLoading;
    updateTask("delete", task);
  }

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
          onClick={check}
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
        <div
          className="task__info"
          onClick={() => {
            {
              !isMobile && modifyTask(task);
            }
          }}
        >
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
              deleteTask(task);
            }}
          >
            Delete
          </p>
        </div>
      </div>
      {isMobile && (
        <div className="task__delete task__del-edit delete">
          <p
            onClick={() => {
              modifyTask(task);
            }}
          >
            Edit
          </p>
          <p
            onClick={() => {
              deleteTask(task);
            }}
          >
            Remove
          </p>
        </div>
      )}
    </li>
  );
}
