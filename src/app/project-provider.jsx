// @ts-ignore-file
"use client";

import { createContext, useContext } from "react";
const Context = createContext([]);
const Provider = ({ children, value }) => {
    return <Context.Provider value={(value)}>{children}</Context.Provider>;
};
const useProjects = () => {
    return useContext(Context);
};
export {Provider, useProjects};
