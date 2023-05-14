import React, { useState } from "react";



export function Create({ setIsOpen, updateTask }) {
    const [name, setName] = useState("");
    const [details, setDetails] = useState("");
    const [type, setType] = useState("normal");
    const [time, setTime] = useState("");
    const [repeat, setRepeat] = useState("")

    function newTask(e) {
        e.preventDefault();
        let task = {
            name: name,
            details: details,
            type: type,
            time: time,
            repeat: repeat
        }
        updateTask('create', task);
        setIsOpen(false);
    }
    return (
        <section className="create">
            <div className="create__header">
                <h1 className="create__title">Add Task</h1>
                <div className="close closeTab" onClick={() => { setIsOpen(false) }}>
                    <p>Close</p>
                </div>
            </div>
            <form className="form taskCreate" action="" method="post" onSubmit={newTask}>
                <fieldset className="form__set">
                    <label className="form__title" htmlFor="name">
                        Name
                    </label>
                    <input
                        required
                        className="form__input"
                        id="name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </fieldset>
                <fieldset className="form__set">
                    <label className="form__title" htmlFor="details">
                        Details
                    </label>
                    <textarea
                        className="form__textarea"
                        id="details"
                        name="details"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                    ></textarea>
                </fieldset>

                <fieldset className="form__set">
                    <label htmlFor="type" className="form__title">
                        Type
                    </label>
                    <select
                        name="type"
                        className="form__input"
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="normal">
                            Normal
                        </option>
                        <option value="repeat">Repeat</option>
                        <option value="time">Time</option>
                    </select>
                </fieldset>

                {type == 'repeat' &&
                    <fieldset
                        className="form__set form__secret"
                        id="count"
                    >
                        <label className="form__title" htmlFor="times">
                            How often
                        </label>
                        <input
                            type="number"
                            name="count"
                            id="times"
                            className="form__input"
                            value={repeat}
                            onChange={(e) => setRepeat(e.target.value)}
                        />
                    </fieldset>
                }

                {type == 'time' &&
                    <fieldset
                        className="form__set form__secret"
                        id="time"
                    >
                        <label className="form__title" htmlFor="time">
                            How long (m)
                        </label>
                        <input
                            type="number"
                            placeholder="Minutes"
                            name="time"
                            id="time"
                            className="form__input"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </fieldset>
                }

                <button className="form__button" type="submit">
                    Create
                </button>
            </form>
        </section>
    );
}
