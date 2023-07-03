import React, { useContext } from "react";
import { Tasks } from "../task/tasks";
import { Login } from "../user/login";
import { GlobalData } from "../IndexContex";
import { Register } from "../user/register";

export function Index() {
  // select the page to show
  const { page } = useContext(GlobalData);
  return <>{page == "login" ? <Login /> : page == "register" ? <Register /> : <Tasks />}</>;
}
