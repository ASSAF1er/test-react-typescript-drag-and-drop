import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import './App.css'
import {TasksContext} from './utils/TasksContext'
import TasksContextProvider from "./utils/TasksContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TasksContextProvider>
    <App /></TasksContextProvider>
  </React.StrictMode>,
);
