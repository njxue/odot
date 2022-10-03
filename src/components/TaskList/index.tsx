import ITask from "../../interface/ITask";
import { Task } from "../Task";
import styles from "../../styles/Task.module.css";

interface TaskListProps {
  tasks: ITask[];
  todoId: string;
}

const TaskList: React.FC<TaskListProps> = (props) => {
  return (
    <div className={styles.taskList}>
      <div className={styles.header}>
        <b>Shit to do</b>
      </div>
      <ol>
        {props.tasks.map((task) => (
          <li key={task.id}>
            <Task task={task} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TaskList;
