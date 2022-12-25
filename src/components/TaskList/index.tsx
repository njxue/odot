import ITask from "../../interface/ITask";
import { Task } from "../Task";
import styles from "../../styles/Task.module.css";

interface TaskListProps {
  tasks: ITask[];
  withLabel?: boolean;
}

const TaskList: React.FC<TaskListProps> = (props) => {
  return (
    <div className={styles.taskList}>
      <ol>
        {props.tasks.map((task) => (
          <li key={task.id}>
            <Task task={task} withLabel={props.withLabel} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TaskList;
