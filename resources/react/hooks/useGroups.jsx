import Axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Auth } from "../IndexContex";

export function useGroup(initialState) {
  const [groups, setGroups] = useState(initialState);
  const [current, setCurrent] = useState("");
  const { isAuth } = useContext(Auth);

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
        setCurrent(r.data.active);
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
        item.run("update");
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
        setCurrent(res.active);
        item.run('update');
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
    ).then((r) => {
      item.run("update");
      setCurrent(r.data.active);
    });
  }

  function updateGroup(action, item) {
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

  return [groups, updateGroup, current];
}
