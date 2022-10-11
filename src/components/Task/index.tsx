import ITask from "../../interface/ITask";
import ToggleCompletionStatusButton from "./ToggleCompletionStatusButton";
import styles from "../../styles/Task.module.css";
import RemoveTaskButton from "./RemoveTaskButton";

interface TaskProps {
  task: ITask;
}

const incompleteTaskClassName = `${styles.task} ${styles.incompleteTask}`;
const completedTaskClassName = `${styles.task} ${styles.completedTask}`;
export const Task: React.FC<TaskProps> = (props) => {
  const { task } = props;
  return (
    <div
      className={
        task.isCompleted ? completedTaskClassName : incompleteTaskClassName
      }
    >
      <div className={styles.status}>
        <ToggleCompletionStatusButton
          task={task}
          completed={task.isCompleted}
        />
        <p>{task.name}</p>
      </div>
      <RemoveTaskButton task={task} />
    </div>
  );
};
