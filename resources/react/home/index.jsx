import React, { useContext } from "react";
import { Tasks } from "../task/tasks";
import { Login } from "../user/login";
import { Auth } from "../IndexContex";
import { Register } from "../user/register";

export function Index() {
  const { page } = useContext(Auth);
  return <>{page == "login" ? <Login /> : page == "register" ? <Register /> : <Tasks />}</>;
}
