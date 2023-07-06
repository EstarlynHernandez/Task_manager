import React, { useContext, useState } from "react";
import { GlobalData } from "../IndexContex";

export function Create({ setIsOpen, updateTask, setTasksLoading, editTask, setEditTask }) {
  const newDate = new Date();
  const [date, setDate] = useState(
    editTask.edit ? { value: editTask.date } : { value: `${newDate.getUTCFullYear()}-0${newDate.getUTCMonth() + 1}-0${newDate.getUTCDate()}` }
  );
  const [name, setName] = useState(editTask.edit ? { value: editTask.name } : { value: "", errors: false });
  const [details, setDetails] = useState(editTask.details ? { value: editTask.details } : { value: "", errors: false });
  const [type, setType] = useState(editTask.edit ? { value: editTask.type } : { value: "normal", errors: false });
  const [value, setValue] = useState(editTask?.type == "time" ? { value: editTask.value / 60 } : { value: "", errors: false });
  const [count, setCount] = useState(editTask?.type == "repeat" ? { value: editTask.count } : { value: "", errors: false });
  const [repeat, setRepeat] = useState({ value: 1 });
  const { filterString, currentGroup } = useContext(GlobalData);

  var dateForm = currentGroup == "date" || currentGroup == "daily";
  // finish the loading animation
  function postCreate() {
    setTasksLoading(false);
    setIsOpen(false);
    setEditTask(false);
  }

  // create a task
  function newTask(e) {
    e.preventDefault();
    let errors = [name.errors, details.errors, type.errors, value.errors, count.errors];

    let task = {
      name: name.value,
      details: details.value,
      type: type.value,
      value: value.value,
      count: count.value,
      date: date.value,
      repeat: repeat.value,
      id: editTask.id && editTask.id,
      run: postCreate,
    };

    if (errors.filter((e) => e).length < 1) {
      setTasksLoading(true);
      if (editTask.edit) {
        updateTask("edit", task);
      } else {
        updateTask("create", task);
      }
    }
  }

  // check if the text is correct
  function smallText(set, target) {
    set({ value: target.value, errors: filterString(target.value, "min:3|max:16") });
  }

  // check if the text is correct
  function longText(set, target) {
    set({ value: target.value, errors: filterString(target.value, "min:3|max:255|nullable") });
  }

  // check if is a correct number
  function number(set, target) {
    set({ value: target.value, errors: filterString(target.value, "number|nullable") });
  }

  return (
    <section className="create">
      <div className={"create__header"}>
        <h1 className="create__title">Add Task</h1>
        <div
          className="close closeTab"
          onClick={() => {
            postCreate();
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
              className={"form__input " + (date.errors && "error__field")}
              id="date"
              type="date"
              name="date"
              value={date.value}
              onChange={(e) => smallText(setDate, e.target)}
              placeholder="Date"
            />
            {date.errors &&
              date.errors.map((e) => (
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
            className={"form__input " + (name.errors && "error__field")}
            id="name"
            type="text"
            name="name"
            value={name.value}
            onChange={(e) => smallText(setName, e.target)}
            placeholder="Task Name"
          />
          {name.errors &&
            name.errors.map((e) => (
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
            className={"form__textarea " + (details.errors && "error__field")}
            id="details"
            name="details"
            value={details.value}
            onChange={(e) => longText(setDetails, e.target)}
            placeholder="Task Details"
          ></textarea>
          {details.errors &&
            details.errors.map((e) => (
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
            value={type.value}
            onChange={(e) => setType({ value: e.target.value })}
          >
            <option value="normal">Normal</option>
            <option value="repeat">Repeat</option>
            <option value="time">Time</option>
          </select>
        </fieldset>

        {/* check the type selected for repeat */}
        {type.value == "repeat" && (
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
              className={"form__input " + (count.count && "error__field")}
              value={count.value}
              onChange={(e) => number(setCount, e.target)}
            />
            {count.errors &&
              count.errors.map((e) => (
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
        {type.value == "time" && (
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
              className={"form__input " + (value.errors && "error__field")}
              value={value.value}
              onChange={(e) => number(setValue, e.target)}
            />
            {value.errors &&
              value.errors.map((e) => (
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
