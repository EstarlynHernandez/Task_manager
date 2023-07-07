import Axios from "axios";
import { useState, useEffect, useContext } from "react";
import { GlobalData } from "../IndexContex";

export function useTasks(initialState) {
  const [tasks, setTask] = useState(initialState);
  const { isAuth, setGlobalErrors, logout } = useContext(GlobalData);

  useEffect(getTask, []);

  // get Task
  function getTask() {
    // Auth user
    if (isAuth) {
      Axios.get("/api/task/" + localStorage.getItem("device"), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "aplication/json",
        },
      })
        .then((r) => {
          (r) => r.json;
          setTask(r.data.tasks);
          localStorage.setItem("token", r.data.token);
        })
        .catch((error) => {
          if (error.request.status == 401) {
            localStorage.removeItem("token");
            logout();
            setGlobalErrors([{ message: "Your session has expired please log in again" }]);
          }
        });
    } else {
      // test user
      const localTask = localStorage.getItem("task");
      if (localTask) {
        setTask(JSON.parse(localTask));
      }
    }
  }

  // check Task
  function Check(item) {
    // Auth user
    if (isAuth) {
      urlRequest(item, "api/task/check", "put");
    } else {
      // test user
      let items = JSON.parse(localStorage.getItem("task"));
      let newTasks = items.filter((t) => {
        if (t.id == item.id) {
          t.status = !t.status;
        }
        return t;
      });
      localStorage.setItem("task", JSON.stringify(newTasks));
      setTask(newTasks);
    }
  }

  // Delete Task
  function Delete(item) {
    // Auth user delete
    if (isAuth) {
      Axios.delete("api/task/delete", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
        data: {
          id: item.id,
        },
      })
        .then((res) => {
          setTask(res.data.tasks);
          item.run && item.run(false);
        })
        .catch((error) => {
          if (error.request.status == 422) {
            setGlobalErrors([{ message: "Your request is invalid" }]);
          } else {
            setGlobalErrors([{ message: "Generic Error" }]);
          }
          item.run && item.run(false);
        });
    } else {
      // test user delete
      let items = JSON.parse(localStorage.getItem("task"));
      let newTasks = items.filter((t) => t.id != item.id);
      localStorage.setItem("task", JSON.stringify(newTasks));
      setTask(newTasks);
    }
    item.run(false);
  }

  // Create Task
  function Create(item) {
    // Auth user
    if (isAuth) {
      urlRequest(item, "api/task/store", "post");
    } else {
      // test user
      let newItem = getLocalTaskType(item);
      let items = JSON.parse(localStorage.getItem("task"));
      if (items?.length > 0) {
        let condition = true;
        let count = 1;
        while (condition) {
          if (items.filter((i) => i?.id == count).length < 1) {
            condition = false;
            newItem.id = count;
            items = [...items, newItem];
            localStorage.setItem("task", JSON.stringify(items));
            setTask(items);
          }
          count++;
        }
      } else {
        newItem.id = 1;
        localStorage.setItem("task", JSON.stringify([newItem]));
        setTask([newItem]);
      }
      item.run && item.run(false);
    }
  }

  function getLocalTaskType(item) {
    let newItem = { name: item.name, details: item.details, status: false, id: item.id, type: item.type, date: item.date, count: 1, value: 0 };
    switch (newItem.type) {
      case "repeat":
        newItem.count = item.count > 0 ? item.count : 1;
        newItem.value = 0;
        break;
      case "time":
        newItem.count = item.value > 0 ? item.value * 60 : 10;
        newItem.value = item.value > 0 ? item.value * 60 : 10;
        break;
    }

    return newItem;
  }

  // set a value for task
  function SetValue(item) {
    // Auth user
    if (isAuth) {
      urlRequest(item, "api/task/value", "post");
    }
  }

  // update a Task
  function Edit(item) {
    // Auth user
    if (isAuth) {
      urlRequest(item, "api/task/update", "put");
    } else {
      // test user
      let items = JSON.parse(localStorage.getItem("task"));
      if (items) {
        let newItems = items.map((i) => {
          if (i.id == item.id) {
            i = getLocalTaskType(item);
          }
          return i;
        });
        localStorage.setItem("task", JSON.stringify(newItems));
        setTask(newItems);
      }
      item.run && item.run(false);
    }
  }

  function urlRequest(item, url, method) {
    Axios[method](
      url,
      {
        id: item.id,
        name: item.name,
        details: item.details,
        type: item.type,
        count: item.count,
        value: item.value,
        date: item.date,
        repeat: item.repeat,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        setTask(res.data.tasks);
        item.run && item.run(false);
      })
      .catch((error) => {
        if (error.request.status == 422) {
          setGlobalErrors([{ message: "Your request is invalid" }]);
        } else {
          setGlobalErrors([{ message: "Generic Error" }]);
        }
        item.run && item.run(false);
      });
  }

  // Select an Action for a task
  function updateTask(action, item) {
    switch (action) {
      case "check":
        Check(item);
        break;
      case "create":
        Create(item);
        break;
      case "edit":
        Edit(item);
        break;
      case "delete":
        Delete(item);
        break;
      case "update":
        if (isAuth) {
          getTask();
        }
        break;
      case "value":
        if (isAuth) {
          SetValue(item);
        }
        break;
    }
  }

  return [tasks, updateTask];
}
