import ITask from "../../interface/ITask";
import { Task } from "../Task";

interface TaskListProps {
  tasks: ITask[];
  todoId: string
}

const TaskList: React.FC<TaskListProps> = (props) => {
  return (
    <div>
      {props.tasks.map((task) => (
        <Task task={task} todoId={props.todoId}/>
      ))}
    </div>
  );
};

export default TaskList;