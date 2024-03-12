import Message from "./components/Message";
import { useState } from "react";

import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core";

import TodosContainer from "./components/TodosContainer";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

function App() {
  const [tasks, setTasks] = useState<Object[]>([
    { id: 1, title: "go to school" },
    { id: 2, title: " wash dishes" },
    { id: 3, title: "take a rest" },
  ]);
  const [todo, setTodo] = useState<string>("");

  //function that finds the position of an element in the array
  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;
    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    });
  };

  const sensors=useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor,{coordinateGetter:sortableKeyboardCoordinates})
    
  )
  return (
    <div className=" w-screen h-screen flex flex-col gap-5 pt-[5%] items-center bg-green-100 ">
     <p className="text-[35px] font-800 mb-10">Todo App with drag and drop.</p> 
     <form action="" className="flex">
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          placeholder="new task"
          className="bg-white border border-gray-400 rounded-sm active:border-gray-400 focus:outline-none text-[18px] py-1 px-2 "
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (todo.trim()==="")return;
            setTasks((prev: Object[]) => [
              ...prev,
              { id: tasks.length + 1, title: todo },
            ]);
            setTodo("");
          }}
          className="py-2 px-8 border rounded-sm bg-gray-700 text-white border-ray-700"
        >
          Add
        </button>
      </form>
     
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <TodosContainer tasks={tasks} />
      </DndContext>
    </div>
  );
}

export default App;
