import { createContext, useState } from "react";
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
    { id: 1, title: "eat",completed:true },
    { id: 2, title: " code",completed:false  },
    { id: 3, title: "take a rest",completed:false  },
  ]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}

export default TasksContextProvider;
