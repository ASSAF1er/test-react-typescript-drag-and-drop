
import { createContext,useState } from "react";

// interface TasksContextType {
//   tasks: Object[];
//   setTasks: React.Dispatch<React.SetStateAction<Object[]>>;
//   handleDelete:object[]
// }

export const TasksContext=createContext<any| undefined>(undefined);

function TasksContextProvider({children}) {
    const [tasks, setTasks] = useState<Object[]>([
        { id: 1, title: "go to school" },
        { id: 2, title: " wash dishes" },
        { id: 3, title: "take a rest" },
      ]);

      
    return ( <TasksContext.Provider value={{tasks,setTasks}} >{children}</TasksContext.Provider> );
}

export default TasksContextProvider;