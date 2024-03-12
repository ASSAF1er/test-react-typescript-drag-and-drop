import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Todo from "./Todo";
function TodosContainer({ tasks }) {
  return (
    <div className="flex flex-col gap-3  p-5 size-[300px] bg-red-200 rounded-sm ">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((item, index) => (
          <Todo key={index} id={item.id} title={item.title} />
        ))}
      </SortableContext>
    </div>
  );
}

export default TodosContainer;
