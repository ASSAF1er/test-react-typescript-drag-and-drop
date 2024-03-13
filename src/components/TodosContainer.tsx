import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Todo from "./Todo";
import { taskType } from "../utils/TasksContext";

interface todosContainerProps {
  tasks: taskType[];
}

function TodosContainer({ tasks }: todosContainerProps) {
  return (
    <ul className="flex flex-col gap-3  p-5 mx-2 w-full sm:w-[500px] h-[60%] sm:h-[300px] overflow-x-hidden overflow-y-scroll bg-gray-200 rounded-sm ">
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((item, index) => (
          <Todo
            key={index}
            id={item.id}
            title={item.title}
            completed={item.completed}
          />
        ))}
      </SortableContext>
    </ul>
  );
}

export default TodosContainer;
