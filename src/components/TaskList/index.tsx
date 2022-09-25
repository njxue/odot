import ITask from "../../interface/ITask";
import { Task } from "../Task";
import styles from "../../styles/Task.module.css";

interface TaskListProps {
  tasks: ITask[];
  todoId: string;
}

const TaskList: React.FC<TaskListProps> = (props) => {
  return (
    <div>
      <ol className={styles.taskList}>
        {props.tasks.map((task) => (
          <li key={task.id}>
            <Task task={task} todoId={props.todoId} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TaskList;
