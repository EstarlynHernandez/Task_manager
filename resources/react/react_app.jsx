import React from "react";
import { createRoot } from "react-dom/client";
import { Index } from "./home/index";
import { Header } from "./home/header";
import { User } from "./IndexContex";

const root = createRoot(document.querySelector("#root"));

root.render(
  <User>
    <Header />
    <Index />
  </User>
);
