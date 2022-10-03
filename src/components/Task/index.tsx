import ITask from "../../interface/ITask";
import ToggleCompletionStatusButton from "./ToggleCompletionStatusButton";
import styles from "../../styles/Task.module.css";
import RemoveTaskButton from "./RemoveTaskButton";

interface TaskProps {
  task: ITask;
}

export const Task: React.FC<TaskProps> = (props) => {
  const { task } = props;
  return (
    <div
      className={styles.task}
      style={{
        backgroundColor: task.isCompleted ? "rgb(236, 236, 236)" : "white",
      }}
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
