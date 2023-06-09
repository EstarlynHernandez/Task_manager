import Axios from "axios";
import { useState, useEffect, useContext } from "react";
import { GlobalData } from "../IndexContex";

export function useGroup(initialState) {
  const [groups, setGroups] = useState(initialState);
  const { isAuth, setCurrentGroup, setGlobalErrors } = useContext(GlobalData);

  // get all group in the first loading page
  useEffect(() => {
    if (isAuth) {
      Axios.get("/api/group", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          Accept: "aplication/json",
        },
      })
        .then((res) => {
          (res) => res.json;
          setGroups({ all: res.data.groups, active: res.data.active });
          setCurrentGroup(res.data.active);
        })
        .catch(() => {
          if (error.request.status == 422) {
            setGlobalErrors([{ message: "Your request is invalid" }]);
          }
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
      .then((res) => {
        setGroups({ all: res.data.groups, active: res.data.active });
        setCurrentGroup(res.data.active);
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

  function UrlRequest(item, url, method) {
    Axios[method](
      url,
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
      .then((res) => {
        if (res.data.groups) {
          setGroups({ all: res.data.groups, active: res.data.active });
        } else {
          setGroups({ all: groups.all, active: res.data.active });
        }
        setCurrentGroup(res.data.active);
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

  // select the action to do
  function updateGroup(action, item) {
    switch (action) {
      case "create":
        if (isAuth) {
          UrlRequest(item, "api/group/store", "post");
        }
        break;
      case "delete":
        if (isAuth) {
          Delete(item);
        }
        break;
      case "check":
        if (isAuth) {
          UrlRequest(item, "api/group/check", "put");
        }
        break;
      case "edit":
        if (isAuth) {
          UrlRequest(item, "api/group/edit", "put");
        }
        break;
      default:
        break;
    }
  }

  // return the groups, current group and function to update groups
  return [groups, updateGroup];
}
