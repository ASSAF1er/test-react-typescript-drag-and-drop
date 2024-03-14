import { useState } from "react";

import {
  DndContext,
  DragEndEvent,
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

  //function that returns the highest id in an array of objects

  const findMaxId = (): number => {
    return tasks.length === 0 ? 0 : Math.max(...tasks.map((task) => task.id));
  };

  //Adding a task
  const handleAddTask = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const newId = findMaxId();
    if (todo.trim() === "") return;

    const newList = [
      ...tasks,
      { id: newId + 1, title: todo, completed: false },
    ];

    setTasks(newList);
    localStorage.setItem("tasks", JSON.stringify(newList));
    setTodo("");
  };

  //function that finds the position of an element in the array
  const getTaskPos = (id: number) =>
    tasks.findIndex((task: taskType) => task.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id === over?.id) return;
    
      const originalPos = getTaskPos(active.id as number);
      const newPos = getTaskPos(over?.id as number);
      const newList=arrayMove(tasks, originalPos, newPos)
      setTasks(newList)
      localStorage.setItem("tasks", JSON.stringify(newList));
      return newList;
    
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0.01,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 0.01,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  return (
    <div className=" w-screen h-screen flex flex-col gap-5 pt-[10%] sm:pt-[5%] px-3 items-center bg-green-100 ">
      <div><p className=" text-[20px] sm:text-[35px] font-800 text-center">
        Todo App with drag and drop.
      </p>
      <p className=" text-[15px] sm:text-[20px] font-400 mb-7 text-gray-500 text-center">Plan your tasks to do and boost your productivity.</p>
      </div><form action="" className="flex gap-0.5 w-full px-1 justify-center">
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          name="task"
          placeholder="new task"
          className=" w-[100%] sm:w-[400px] bg-white border border-gray-400 rounded-sm active:border-gray-400 focus:outline-none text-[16px] sm:text-[18px] py-1 px-2 "
        />
        <button
          onClick={(e) => {
            handleAddTask(e);
          }}
          className="py-2 px-8 border rounded-sm bg-gray-700 text-white border-gray-700"
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
      <footer className="absolute bottom-3 right-3 sm:right-20 text-gray-600">
        coded with 💜 by Assaf
      </footer>
    </div>
  );
}

export default App;
