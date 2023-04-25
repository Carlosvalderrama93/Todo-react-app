import React, { createContext } from "react";
import getTodos from "./utils/getTodos";

const tasksList = createContext(getTodos());

export default function useContext() {
  return <div>useContext</div>;
}
