import React, { useContext, useState } from "react";
import { Auth } from "../IndexContex";

export function Create({ setIsOpen, updateTask, setTasksLoading }) {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [type, setType] = useState("normal");
  const [value, setValue] = useState("");
  const [count, setCount] = useState("");
  const [taskErrors, setTaskErrors] = useState([]);
  const { filterString } = useContext(Auth);

  function postCreate(){
    setTasksLoading(false);
    setIsOpen(false);
  }
  function newTask(e) {
    e.preventDefault();
    let errors = [];

    let task = {
      name: name,
      details: details,
      type: type,
      value: value,
      count: count,
      run: postCreate,
    };

    if (name.length < 3) {
      errors["name"] = true;
    }

    if (errors.length < 1) {
      setTasksLoading(true);
      setTaskErrors([]);
      updateTask("create", task);
    } else {
      setTaskErrors(errors);
    }
  }

  function smallText(set, target) {
    let errors = taskErrors;
    if (target.value.length > 0) {
      errors[target.name] = filterString(target.value, "min:3|max:16");
    } else {
      errors[target.name] = false;
    }
    set(target.value);
    setTaskErrors(errors);
  }

  function longText(set, target) {
    let errors = taskErrors;
    if (target.value.length > 0) {
      errors[target.name] = filterString(target.value, "min:3|max:255");
    } else {
      errors[target.name] = false;
    }
    set(target.value);
    setTaskErrors(errors);
  }

  function number(set, target) {
    let errors = taskErrors;
    if (target.value.length > 0) {
      errors[target.name] = filterString(target.value, "number");
    } else {
      errors[target.name] = false;
    }
    try {
      set(target.value);
    } catch (error) {
      error[target.name] = true;
    }
    setTaskErrors(errors);
  }
  return (
    <section className="create">
      <div className={"create__header"}>
        <h1 className="create__title">Add Task</h1>
        <div
          className="close closeTab"
          onClick={() => {
            setIsOpen(false);
            setTasksLoading(false);
          }}
        >
          <p>Close</p>
        </div>
      </div>
      <form
        className="form taskCreate"
        action=""
        method="post"
        onSubmit={newTask}
      >
        <fieldset className="form__set">
          <label
            className="form__title"
            htmlFor="name"
          >
            Name
          </label>
          <input
            required
            className={"form__input " + (taskErrors.name && "error__field")}
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => smallText(setName, e.target)}
            placeholder="Task Name"
          />
          {taskErrors.name &&
            taskErrors.name.map((e) => (
              <p
                className="error__text"
                key={e}
              >
                {e}
              </p>
            ))}
        </fieldset>
        <fieldset className="form__set">
          <label
            className="form__title"
            htmlFor="details"
          >
            Details
          </label>
          <textarea
            className={"form__textarea " + (taskErrors.details && "error__field")}
            id="details"
            name="details"
            value={details}
            onChange={(e) => longText(setDetails, e.target)}
            placeholder="Task Details"
          ></textarea>
          {taskErrors.details &&
            taskErrors.details.map((e) => (
              <p
                className="error__text"
                key={e}
              >
                {e}
              </p>
            ))}
        </fieldset>

        <fieldset className="form__set">
          <label
            htmlFor="type"
            className="form__title"
          >
            Type
          </label>
          <select
            name="type"
            className="form__input"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="repeat">Repeat</option>
            <option value="time">Time</option>
          </select>
        </fieldset>

        {type == "repeat" && (
          <fieldset
            className="form__set form__secret"
            id="count"
          >
            <label
              className="form__title"
              htmlFor="times"
            >
              How often
            </label>
            <input
              placeholder="How Many Times "
              type="number"
              name="count"
              id="times"
              className={"form__input " + (taskErrors.count && "error__field")}
              value={count}
              onChange={(e) => number(setCount, e.target)}
            />
            {taskErrors.count &&
              taskErrors.count.map((e) => (
                <p
                  className="error__text"
                  key={e}
                >
                  {e}
                </p>
              ))}
          </fieldset>
        )}

        {type == "time" && (
          <fieldset
            className="form__set form__secret"
            id="time"
          >
            <label
              className="form__title"
              htmlFor="time"
            >
              How long (m)
            </label>
            <input
              type="number"
              placeholder="How Many Minutes"
              name="time"
              id="time"
              className={"form__input " + (taskErrors.time && "error__field")}
              value={value}
              onChange={(e) => number(setValue, e.target)}
            />
            {taskErrors.time &&
              taskErrors.time.map((e) => (
                <p
                  className="error__text"
                  key={e}
                >
                  {e}
                </p>
              ))}
          </fieldset>
        )}

        <button
          className="form__button"
          type="submit"
        >
          Create
        </button>
      </form>
    </section>
  );
}
