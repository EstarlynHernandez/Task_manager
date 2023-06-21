import React, { useContext, useEffect, useState } from "react";
import { Task } from "./task";
import { useTasks } from "../hooks/useTasks";
import { Create } from "./create";
import { Groups } from "./groups";
import { Auth } from "../IndexContex";

export function Tasks() {
  const [tasks, updateTask] = useTasks([]);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const { isMenuOpen, filterString, isAuth } = useContext(Auth);
  const [taskNameError, setTaskNameError] = useState(false);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [filter, setFilter] = useState({ order: "name", filter: "all" });
  const [filterTask, setFilterTask] = useState([]);
  const [openFilters, setOpenFilters] = useState(false);
  const [editTask, setEditTask] = useState(false);

  useEffect(() => {
    fill(filter.order);
  }, [filter, tasks]);

  function fill(fil) {
    let taskFilter = [...tasks];
    if (isAuth) {
      taskFilter.sort((a, b) => {
        if (b[fil] > a[fil]) {
          return -1;
        } else if (b[fil] < a[fil]) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    if (filter.filter) {
      switch (filter.filter) {
        case "complete":
          taskFilter = taskFilter.filter((task) => task.status);
          break;
        case "uncomplete":
          taskFilter = taskFilter.filter((task) => !task.status);
          break;
      }
    }
    setFilterTask(taskFilter);
  }

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
    if (e.target.value.length < 1 || e.target.value.length > 2) {
      setTaskNameError(false);
    } else {
      setTaskNameError(true);
    }
    setName(e.target.value);
  }

  function modifyTask(oldTask) {
    oldTask.edit = true;
    setEditTask(oldTask);
    setIsOpen(true);
  }

  return (
    <main className={"content"}>
      {isOpen && (
        <Create
          setIsOpen={setIsOpen}
          updateTask={updateTask}
          setTasksLoading={setTasksLoading}
          editTask={editTask}
          setEditTask={setEditTask}
        />
      )}
      <div
        style={isOpen ? { filter: "blur(1rem)" } : {}}
        className={isMenuOpen ? "mBlur" : "tasks--container"}
      >
        <div className="task__header">
          <div className="taskFilter">
            <h3
              className="form__title"
              onClick={() => {
                setOpenFilters(!openFilters);
              }}
            >
              Filter{openFilters ? "▲" : "▼"}
            </h3>
            {openFilters && (
              <div className="form__filters">
                <fieldset className="form__set">
                  <label
                    className="form__title"
                    htmlFor="order"
                  >
                    Order
                  </label>
                  <select
                    title="filter"
                    onChange={(e) => setFilter({ ...filter, order: e.target.value })}
                    name="order"
                    id="filters"
                    className="form__input"
                  >
                    <option value="name">Name</option>
                    <option value="create_at">Data</option>
                    <option value="status">Status</option>
                  </select>
                </fieldset>
                <fieldset className="form__set">
                  <label
                    className="form__title"
                    htmlFor="filter"
                  >
                    Show
                  </label>
                  <select
                    title="filter"
                    onChange={(e) => setFilter({ ...filter, filter: e.target.value })}
                    name="filter"
                    id="filters"
                    className="form__input"
                  >
                    <option value="All">All</option>
                    <option value="complete">Complete</option>
                    <option value="uncomplete">Uncomplete</option>
                  </select>
                </fieldset>
              </div>
            )}
          </div>
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
          {filterTask.length > 0 &&
            filterTask.map(
              (filterTask) =>
                filterTask && (
                  <Task
                    key={filterTask.id}
                    task={filterTask}
                    updateTask={updateTask}
                    setTasksLoading={setTasksLoading}
                    modifyTask={modifyTask}
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
      <Groups
        updateTask={updateTask}
        setTasksLoading={setTasksLoading}
      />
    </main>
  );
}
