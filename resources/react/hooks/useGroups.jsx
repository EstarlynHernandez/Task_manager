import Axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Auth } from "../IndexContex";

export function useGroup(initialState) {
  const [groups, setGroups] = useState(initialState);
  const [current, setCurrent] = useState("");
  const { isAuth } = useContext(Auth);

  // get all group in the first loading page
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
          setCurrent(r.data.active);
        })
        .catch((r) => {
          console.log("error");
        });
    }
  }, []);

  // remove one group
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
        item.run(false);
        setGroups(data.groups);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // create a new group
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
        item.run(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // set open group
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
      item.run(false);
      setCurrent(r.data.active);
    });
  }

  // create new group
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
        item.run(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // update a group
  function Edit(item) {
    Axios.put(
      "api/group/edit",
      {
        id: item.id,
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
        item.run(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // select the action to do
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
      case "edit":
        if (isAuth) {
          Edit(item);
        }
        break;
      default:
        break;
    }
  }
  
  // return the groups, current group and function to update groups
  return [groups, updateGroup, current];
}
