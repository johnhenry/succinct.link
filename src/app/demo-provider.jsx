// @ts-ignore-file
"use client";

import { createContext, useContext } from "react";
const Context = createContext([]);
const DemoProvider = ({ children, value }) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
const useDemos = () => {
  return useContext(Context);
};
export { DemoProvider, useDemos };
