import React, { useState } from "react";
import { Task } from "./task";
import { useTasks } from "../hooks/useTasks";
import { Create } from "./create";
import { Groups } from "./groups";
import { error } from "laravel-mix/src/Log";

export function Tasks() {
  const [tasks, updateTask] = useTasks([]);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");

  function newTask(e) {
    e.preventDefault();
    let task = {
      name: name,
      type: "normal",
      details: null,
    };
    if(name.length >= 3){
      updateTask("create", task);
      setName('');
    }
  }

  return (
    <main className="content">
      {isOpen && (
        <Create
          setIsOpen={setIsOpen}
          updateTask={updateTask}
        />
      )}
      <div style={isOpen ? { filter: "blur(1rem)" } : {}}>
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
        <ul className="tasks continer">
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
                className="task__input"
                value={name}
                onChange={(e) => {setName(e.target.value)}}
              />
              <button
                type="submit"
                className="task__button--create"
              >
                Create
              </button>
            </form>
          </li>
          {tasks.length > 0 &&
            tasks.map(
              (task) =>
                task && (
                  <Task
                    key={task.id}
                    task={task}
                    updateTask={updateTask}
                  />
                )
            )}
        </ul>
      </div>
      <Groups updateTask={updateTask} />
    </main>
  );
}
