import Axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Auth } from "../IndexContex";

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
