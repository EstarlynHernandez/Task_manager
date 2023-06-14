import React, { useContext, useState } from "react";
import { Task } from "./task";
import { useTasks } from "../hooks/useTasks";
import { Create } from "./create";
import { Groups } from "./groups";
import { Auth } from "../IndexContex";

export function Tasks() {
  const [tasks, updateTask] = useTasks([]);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const { isMenuOpen, filterString } = useContext(Auth);
  const [taskNameError, setTaskNameError] = useState(false);
  const [tasksLoading, setTasksLoading] = useState(false);

  filterString("string", "min:12|max:2|number");
  function newTask(e) {
    e.preventDefault();
    setTasksLoading(true);
    let task = {
      name: name,
      type: "normal",
      details: null,
      run: setTasksLoading,
    };
    if (name.length >= 3) {
      updateTask("create", task);
      setName("");
    } else {
      setTaskNameError(true);
    }
  }

  function ThisName(e) {
    if ((e.target.value.length < 1) | (e.target.value.length > 2)) {
      setTaskNameError(false);
    } else {
      setTaskNameError(true);
    }
    setName(e.target.value);
  }

  return (
    <main className={"content"}>
      {isOpen && (
        <Create
          setIsOpen={setIsOpen}
          updateTask={updateTask}
          setTasksLoading={setTasksLoading}
        />
      )}
      <div
        style={isOpen ? { filter: "blur(1rem)" } : {}}
        className={isMenuOpen ? "mBlur" : "tasks--container"}
      >
        <div className="task__header">
          <h1 className="tasks__title">Tasks</h1>
          <div
            className="floating__button createTab"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <svg
              fill="transparent"
              width="3.5rem"
              height="3.5rem"
            >
              <line
                x1="50%"
                x2="50%"
                y1="20%"
                y2="80%"
                stroke="#099"
                strokeWidth="20"
                strokeLinecap="round"
              />
              <line
                x1="80%"
                x2="20%"
                y1="50%"
                y2="50%"
                stroke="#099"
                strokeWidth="20"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <ul className={"tasks continer " + (tasksLoading ? "loading" : "")}>
          <li className="task__list">
            <form
              action=""
              className="task__form task"
              onSubmit={newTask}
            >
              <p className="task__text">New Task</p>
              <input
                placeholder="task name"
                type="text"
                className={taskNameError ? "task__input form__error error" : "task__input"}
                value={name}
                onChange={ThisName}
              />
              <button
                type="submit"
                className="task__button--create"
              >
                Create
              </button>
            </form>
            {taskNameError && <p className="error__text">Task name need 3 or most words</p>}
          </li>
          {tasks.length > 0 &&
            tasks.map(
              (task) =>
                task && (
                  <Task
                    key={task.id}
                    task={task}
                    updateTask={updateTask}
                    setTasksLoading={setTasksLoading}
                  />
                )
            )}
        </ul>
        {tasksLoading && (
          <div className="loading--icon">
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
      </div>
      <Groups updateTask={updateTask} setTasksLoading={setTasksLoading} />
    </main>
  );
}
