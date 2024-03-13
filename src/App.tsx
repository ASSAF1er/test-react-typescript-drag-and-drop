import { useState } from "react";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import TodosContainer from "./components/TodosContainer";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useContext } from "react";
import { TasksContext, TasksContextType, taskType } from "./utils/TasksContext";

function App() {
  const { tasks, setTasks } = useContext(TasksContext) as TasksContextType;
  const [todo, setTodo] = useState<string>("");

  //function that finds the position of an element in the array
  const getTaskPos = (id: number) =>
    tasks.findIndex((task: taskType) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    setTasks((tasks: taskType[]) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  return (
    <div className=" w-screen h-screen flex flex-col gap-5 pt-[15%] sm:pt-[5%] px-3 items-center bg-green-100 ">
      <p className=" text-[20px] sm:text-[35px] font-800 mb-10">
        Todo App with drag and drop.
      </p>
      <form action="" className="flex w-full px-1 justify-center">
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          placeholder="new task"
          className=" w-[100%] sm:w-[400px] bg-white border border-gray-400 rounded-sm active:border-gray-400 focus:outline-none text-[16px] sm:text-[18px] py-1 px-2 "
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (todo.trim() === "") return;
            setTasks((prev: taskType[]) => [
              ...prev,
              { id: tasks.length + 1, title: todo, completed: false },
            ]);
            setTodo("");
          }}
          className="py-2 px-8 border rounded-sm bg-gray-700 text-white border-ray-700"
        >
          Add
        </button>
      </form>

      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <TodosContainer tasks={tasks} />
      </DndContext>
      <footer className="absolute bottom-3 right-3 sm:right-20">
        coded with 💜 by Assaf
      </footer>
    </div>
  );
}

export default App;
