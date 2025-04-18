// @ts-ignore-file
"use client";

import { createContext, useContext } from "react";
const Context = createContext([]);
const ProjectProvider = ({ children, value }) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
const useProjects = () => {
  return useContext(Context);
};
export { ProjectProvider, useProjects };
