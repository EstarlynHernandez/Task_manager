import Axios from "axios";
import { useState, useEffect } from "react";

export function useTasks(initialState) {
  const [tasks, setTask] = useState(initialState);

  useEffect(getTask, []);

  function getTask() {
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
        // localStorage.removeItem("token");
        if (localStorage.getItem("task")) {
          setTask(JSON.parse(localStorage.getItem("task")));
        }
      });
  }

  function Check(item) {
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
  }

  function Delete(item) {
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
  }

  function Create(item) {
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
  }

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
        getTask();
        break;
      default:
        break;
    }
  }

  return [tasks, updateTask];
}

export function useGroup(initialState) {
  const [groups, setGroups] = useState(initialState);

  useEffect(() => {
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
        Create(item);
        break;
      case "delete":
        Delete(item);
        break;
      case "check":
        Check(item);
        break;
      default:
        break;
    }
  }

  return [groups, updateTask];
}
