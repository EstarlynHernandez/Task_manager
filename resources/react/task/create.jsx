import React, { useContext, useState } from "react";
import { GlobalData } from "../IndexContex";

export function Create({ setIsOpen, updateTask, setTasksLoading, editTask, setEditTask }) {
  const newDate = new Date();
  const [date, setDate] = useState(editTask.edit ? editTask.date : `${newDate.getUTCFullYear()}-0${newDate.getUTCMonth() + 1}-0${newDate.getUTCDate()}`);
  const [name, setName] = useState(editTask.edit ? editTask.name : "");
  const [details, setDetails] = useState(editTask.edit && editTask.details ? editTask.details : "");
  const [type, setType] = useState(editTask.edit ? editTask.type : "normal");
  const [value, setValue] = useState(editTask.edit ? editTask.count / 60 : "");
  const [count, setCount] = useState(editTask.edit ? editTask.count : "");
  const [repeat, setRepeat] = useState(1);
  const [taskErrors, setTaskErrors] = useState([]);
  const { filterString, currentGroup } = useContext(GlobalData);

  var dateForm = currentGroup == "date" || currentGroup == "daily";
  // finish the loading animation
  function postCreate() {
    setTasksLoading(false);
    setIsOpen(false);
  }

  // create a task
  function newTask(e) {
    e.preventDefault();
    let errors = [];

    let task = {
      name: name,
      details: details,
      type: type,
      value: value,
      count: count,
      date: date,
      repeat: repeat,
      run: postCreate,
    };

    if (editTask.id) {
      task.id = editTask.id;
    }

    if (name.length < 3) {
      errors["name"] = true;
    }

    if (errors.length < 1) {
      setTasksLoading(true);
      setTaskErrors([]);
      if (editTask.edit) {
        updateTask("edit", task);
      } else {
        updateTask("create", task);
      }
    } else {
      setTaskErrors(errors);
    }
  }

  // check if the text is correct
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

  // check if the text is correct
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

  // check if is a correct number
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
            setEditTask(false);
          }}
        >
          <p>Close</p>
        </div>
      </div>
      {/* task create form */}
      <form
        className="form taskCreate"
        action=""
        method="post"
        onSubmit={newTask}
      >
        {dateForm && (
          <fieldset className="form__set">
            <label
              className="form__title"
              htmlFor="date"
            >
              Date
            </label>
            <input
              required
              className={"form__input " + (taskErrors.date && "error__field")}
              id="date"
              type="date"
              name="date"
              value={date}
              onChange={(e) => smallText(setDate, e.target)}
              placeholder="Date"
            />
            {taskErrors.date &&
              taskErrors.date.map((e) => (
                <p
                  className="error__text"
                  key={e}
                >
                  {e}
                </p>
              ))}
          </fieldset>
        )}
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

        {/* check the type selected for repeat */}
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

        {/* check the type selected for time */}
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

        {currentGroup == "daily" && (
          <fieldset className="form__set">
            <label
              htmlFor="repeat"
              className="form__title"
            >
              Repeat
            </label>
            <select
              name="repeat"
              className="form__input"
              id="repeat"
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
            >
              <option value="1">Daily</option>
              <option value="2">2 Day</option>
              <option value="4">4 Day</option>
              <option value="5">5 Day</option>
              <option value="6">6 Day</option>
              <option value="7">Weekly</option>
              <option value="8">Biweekly</option>
              <option value="9">Monthly</option>
            </select>
          </fieldset>
        )}

        <button
          className="form__button"
          type="submit"
        >
          {editTask.edit ? "Update" : "Create"}
        </button>
      </form>
    </section>
  );
}
