import { createContext, useState,useEffect } from "react";
import { PropsWithChildren } from "react";

export interface taskType {
  id: number;
  title: string;
  completed: boolean;
}

export interface TasksContextType {
  tasks: taskType[];
  setTasks: React.Dispatch<React.SetStateAction<taskType[]>>;
}

export const TasksContext = createContext<TasksContextType | undefined>(
  undefined,
);

function TasksContextProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<taskType[]>([
    { id: 1, title: "eat", completed: false },
    { id: 2, title: "Code", completed: false },
    { id: 3, title: "Sleep", completed: false },
  ]);
  useEffect(()=>{
   const storedTasks = localStorage.getItem("tasks");
  storedTasks && setTasks(JSON.parse(storedTasks)); 
  },[])
  

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}

export default TasksContextProvider;
