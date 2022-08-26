import ITask from "../../interface/ITask";
import { Task } from "../Task";

interface TaskListProps {
  tasks: ITask[];
}

const TaskList: React.FC<TaskListProps> = (props) => {
  return (
    <div>
      {props.tasks.map((task) => (
        <Task task={task}/>
      ))}
    </div>
  );
};

export default TaskList;