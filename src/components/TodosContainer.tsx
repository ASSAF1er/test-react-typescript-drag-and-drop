import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Todo from "./Todo";
function TodosContainer({ tasks }) {
  return (
    <ul className="flex flex-col gap-3  p-5 w-[500px] h-[300px] overflow-x-hidden overflow-y-scroll bg-gray-200 rounded-sm ">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((item, index) => (
          <Todo key={index} id={item.id} title={item.title} />
        ))}
      </SortableContext>
    </ul>
  );
}

export default TodosContainer;
