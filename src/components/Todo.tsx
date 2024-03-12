import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
function Todo({ id, title, handleDelete, handleCheck }) {
  const { attributes, listeners, setNodeRef, transform, transition} =
    useSortable({ id });

  const style = { transition, transform: CSS.Transform.toString(transform) };
  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full flex rounded-sm bg-white hover:bg-gray-50 border p-2 cursor-pointer text-center touch-none shadow-md "
    >
     <p className="flex-1">{title}</p>  <div className="flex gap-3"><input type="checkbox" onChange={()=>handleCheck(id)} /><span onClick={()=>handleDelete(id)} className="material-icons-outlined text-red-500 flex items-center justify-center hover:text-red-300">delete</span></div>
    </li>
  );
}

export default Todo;
