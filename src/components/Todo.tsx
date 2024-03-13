import { useContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  TasksContext,
  TasksContextType,
  taskType,
} from "../utils/TasksContext";
import classNames from "classnames";
function Todo({ id, title, completed }: taskType) {
  const { tasks, setTasks } = useContext(TasksContext) as TasksContextType;

  const handleDelete = (id: number) => {
    
     const newList= tasks.filter((item: taskType) => {
        item.id !== id;
      })
    setTasks(newList);
    console.log(newList);
  };
  const handleCheck = (id: number) => {
    setTasks(
      tasks.map((task: taskType) => 
        task.id === id? { ...task, completed: !task.completed } :(task)
      ));
    
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = { transition, transform: CSS.Transform.toString(transform) };
  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={classNames(completed?'bg-blue-100 hover:bg-blue-100 z-10 text-gray-400':'bg-white',"w-full flex gap-2 rounded-sm  hover:bg-gray-50 border p-2 cursor-pointer text-center touch-none shadow-md ")}
    >
      <p className="flex-1">{title}</p>{" "}
      <div className="flex gap-3">
        <input type="checkbox" checked={completed} onChange={()=>handleCheck(id)} />
        <button onClick={() => handleDelete(id)} role="button">
          <span className="material-icons-outlined z-[100] text-red-500 flex items-center justify-center hover:text-red-300">
            delete
          </span>
        </button>
      </div>
    </li>
  );
}

export default Todo;
