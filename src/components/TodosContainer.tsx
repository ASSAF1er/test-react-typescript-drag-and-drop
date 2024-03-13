import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Todo from "./Todo";
function TodosContainer({ tasks }) {
  return (
    <ul className="flex flex-col gap-3  p-5 mx-2 w-full sm:w-[500px] h-[400px] sm:h-[300px] overflow-x-hidden overflow-y-scroll bg-gray-200 rounded-sm ">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}  >
        {tasks.map((item, index) => (
          <Todo key={index} id={item.id} title={item.title} />
        ))}
      </SortableContext>
    </ul>
  );
}

export default TodosContainer;
