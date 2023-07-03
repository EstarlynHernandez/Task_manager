import Axios from "axios";
import { useState, useEffect, useContext } from "react";
import { GlobalData } from "../IndexContex";

export function useTasks(initialState) {
  const [tasks, setTask] = useState(initialState);
  const { isAuth, setIsAuth, currentGroup } = useContext(GlobalData);

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
        .catch((r) => {
          localStorage.removeItem("token");
          setIsAuth(false);
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
      Axios.put(
        "api/task/check",
        {
          id: item.id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.data)
        .then((data) => {
          setTask(data.tasks);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // test user
      let items = JSON.parse(localStorage.getItem("task"));
      items.forEach((element) => {
        if (element) {
          if (item.id == element.id) {
            items[element.id].status = !items[element.id].status;
            localStorage.setItem("task", JSON.stringify(items));
            setTask(items);
          }
        }
      });
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
        .then((response) => response.data)
        .then((data) => {
          setTask(data.tasks);
          item.run(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // test user delete
      let items = JSON.parse(localStorage.getItem("task"));
      let newItems = [];
      items.forEach((element) => {
        if (element) {
          if (!(item.id == element.id)) {
            newItems[element.id] = element;
          }
        }
      });
      localStorage.setItem("task", JSON.stringify(newItems));
      setTask(newItems);
    }
    item.run(false);
  }

  // Create Task
  function Create(item) {
    // Auth user
    if (isAuth) {
      Axios.post(
        "api/task/store",
        {
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
        .then((response) => response.data)
        .then((res) => {
          setTask(res.tasks);
          if (!res.error) {
            item.run(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // test user
      let items = JSON.parse(localStorage.getItem("task"));
      if (items) {
        let condition = true;
        let count = 1;
        while (condition) {
          if (!items[count]) {
            item.id = count;
            item.status = false;
            item.created_at = new Date();
            if (item.type == "time") {
              item.value = parseFloat(item.value) * 60;
            } else if (item.type == "repeat") {
              item.count = parseInt(item.count);
              item.value = 0;
            }
            items[count] = item;
            condition = false;
            localStorage.setItem("task", JSON.stringify(items));
            setTask(items);
          }
          count++;
        }
      } else {
        item.id = 0;
        item.status = false;
        items = [];
        items[0] = item;
        localStorage.setItem("task", JSON.stringify(items));
        setTask(items);
      }
      item.run(false);
    }
  }

  // set a value for task
  function SetValue(item) {
    // Auth user
    if (isAuth) {
      Axios.post(
        "api/task/value",
        {
          id: item.id,
          value: item.value,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.data)
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // update a Task
  function Edit(item) {
    // Auth user
    if (isAuth) {
      Axios.put(
        "api/task/update",
        {
          name: item.name,
          details: item.details,
          type: item.type,
          count: item.count,
          value: item.value,
          id: item.id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.data)
        .then((res) => {
          setTask(res.tasks);
          if (!res.error) {
            item.run(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // test user
      let items = JSON.parse(localStorage.getItem("task"));
      if (items) {
        let condition = true;
        let count = 1;
        while (condition) {
          if (count == item.id) {
            item.status = false;
            if (item.type == "time") {
              item.value = parseFloat(item.value) * 60;
            } else if (item.type == "repeat") {
              item.count = parseInt(item.count);
              item.value = 0;
            }
            items[count] = item;
            condition = false;
            localStorage.setItem("task", JSON.stringify(items));
            setTask(items);
          }
          count++;
          if (count > 500) {
            condition = false;
          }
        }
      } else {
        item.id = 0;
        item.status = false;
        items = [];
        items[0] = item;
        localStorage.setItem("task", JSON.stringify(items));
        setTask(items);
      }
      item.run(false);
    }
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
      default:
        break;
    }
  }

  return [tasks, updateTask];
}
