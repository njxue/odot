import ITask from "../../interface/ITask";
import { Task } from "../Task";
import styles from "../../styles/Task.module.css";

interface CompletedTasksProps {
  tasks: ITask[];
}

const CompletedTasks: React.FC<CompletedTasksProps> = (props) => {
  const { tasks } = props;

  return (
    <div className={styles.taskList}>
      <b>Completed</b>
      <ol>
        {tasks.map((task) => (
          <li key={task.id}>
            <Task task={task} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CompletedTasks;
