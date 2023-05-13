import Axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Auth } from "../IndexContex";

export function useTasks(initialState) {
  const [tasks, setTask] = useState(initialState);
  const { isAuth } = useContext(Auth);

  useEffect(getTask, []);

  // get Task
  function getTask() {
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
      const localTask = localStorage.getItem("task");
      if (localTask) {
        setTask(JSON.parse(localTask));
      }
    }
  }

  // check Task
  function Check(item) {
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
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
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
  }

  // Create Task
  function Create(item) {
    if (isAuth) {
      Axios.post(
        "api/task/store",
        {
          name: item.name,
          details: item.details,
          type: item.type,
          count: item.repeat,
          value: item.time,
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
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      let items = JSON.parse(localStorage.getItem("task"));
      if (items) {
        let condition = true;
        let count = 1;
        while (condition) {
          if (!items[count]) {
            item.id = count;
            item.status = false;
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

export function useGroup(initialState) {
  const [groups, setGroups] = useState(initialState);
  const { isAuth } = useContext(Auth);

  useEffect(() => {
    if (isAuth) {
      Axios.get("/api/group", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "aplication/json",
        },
      })
        .then((r) => {
          (r) => r.json;
          setGroups(r.data.groups);
        })
        .catch((r) => {
          console.log("error");
        });
    } else {
      const localTask = localStorage.getItem("groups");
      if (localTask) {
        setGroups(JSON.parse(localTask));
      }
    }
  }, []);

  function Delete(item) {
    Axios.delete("api/group/delete", {
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
        setGroups(data.groups);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function Create(item) {
    Axios.post(
      "api/group/store",
      {
        name: item.name,
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
        setGroups(res.groups);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function Check(item) {
    Axios.put(
      "api/group/check",
      {
        id: item.id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "application/json",
        },
      }
    ).then(() => {
      item.run("update");
    });
  }

  function updateTask(action, item) {
    switch (action) {
      case "create":
        if (isAuth) {
          Create(item);
        }
        break;
      case "delete":
        if (isAuth) {
          Delete(item);
        }
        break;
      case "check":
        if (isAuth) {
          Check(item);
        }
        break;
      default:
        break;
    }
  }

  return [groups, updateTask];
}