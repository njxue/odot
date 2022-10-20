import ITask from "../../interface/ITask";
import ToggleCompletionStatusButton from "./ToggleCompletionStatusButton";
import styles from "../../styles/Task.module.css";
import RemoveTaskButton from "./RemoveTaskButton";import ToggleImportance from "./ToggleImportance";

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
      <div className={styles.controls}>
        {!task.isCompleted && <ToggleImportance task={task} />}
        <RemoveTaskButton task={task} />
      </div>
    </div>
  );
};
