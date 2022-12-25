import ITask from "../../interface/ITask";
import ToggleCompletionStatusButton from "./ToggleCompletionStatusButton";
import styles from "../../styles/Task.module.css";
import RemoveTaskButton from "./RemoveTaskButton";
import ToggleImportance from "./ToggleImportance";
import { DueDate } from "./DueDate";
import { Badge } from "@chakra-ui/react";

interface TaskProps {
  task: ITask;
  withLabel?: boolean;
}

const incompleteTaskClassName = `${styles.task} ${styles.incompleteTask}`;
const completedTaskClassName = `${styles.task} ${styles.completedTask}`;
export const Task: React.FC<TaskProps> = (props) => {
  const { task, withLabel } = props;
  return (
    <div
      className={
        task.isCompleted ? completedTaskClassName : incompleteTaskClassName
      }
    >
      <div className={styles.details}>
        <ToggleCompletionStatusButton
          task={task}
          completed={task.isCompleted}
        />
        <p>{task.name}</p>
        {withLabel == true && <Badge>{task.todoName}</Badge>}
      </div>
      {task.dueDate && <DueDate dueDate={task.dueDate} />}
      <div className={styles.controls}>
        {!task.isCompleted && <ToggleImportance task={task} />}
        <RemoveTaskButton task={task} />
      </div>
    </div>
  );
};
