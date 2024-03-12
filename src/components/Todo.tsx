import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
function Todo({ id, title }) {
  const { attributes, listeners, setNodeRef, transform, transition} =
    useSortable({ id });

  const style = { transition, transform: CSS.Transform.toString(transform) };
  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full rounded-sm bg-gray-100 border p-2 cursor-pointer touch-none shadow-md "
    >
      {title}
    </li>
  );
}

export default Todo;
