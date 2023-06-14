import Axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Auth } from "../IndexContex";

export function useTasks(initialState) {
  const [tasks, setTask] = useState(initialState);
  const { isAuth } = useContext(Auth);

  useEffect(getTask, []);

  // get Task
  function getTask() {
    // online
    if (isAuth) {
      Axios.get("/api/task/", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "aplication/json",
        },
      })
        .then((r) => {
          (r) => r.json;
          setTask(r.data.tasks);
        })
        .catch((r) => {
          localStorage.removeItem("token");
        });
    } else {
      // Offline
      const localTask = localStorage.getItem("task");
      if (localTask) {
        setTask(JSON.parse(localTask));
      }
    }
  }

  // check Task
  function Check(item) {
    // Online
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
      // Offline
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
    // online delete
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
      // offline delete
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
    // online
    if (isAuth) {
      Axios.post(
        "api/task/store",
        {
          name: item.name,
          details: item.details,
          type: item.type,
          count: item.count,
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
        .then((res) => {
          setTask(res.tasks);
          if(!res.error){
            item.run(false);
          }
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // offline
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

  // Select an Action for a task
  function updateTask(action, item) {
    switch (action) {
      case "check":
        Check(item);
        break;
      case "create":
        Create(item);
        break;
      case "delete":
        Delete(item);
        break;
      case "update":
        if (isAuth) {
          getTask();
        }
        break;
      default:
        break;
    }
  }

  return [tasks, updateTask];
}
