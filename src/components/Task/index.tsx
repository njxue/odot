import ITask from "../../interface/ITask";
import RemoveTaskButton from "./RemoveTaskButton";
import styles from "../../styles/Task.module.css";

interface TaskProps {
  task: ITask;
  todoId: string;
}

export const Task: React.FC<TaskProps> = (props) => {
  return (
    <div className={styles.task}>
      <p>{props.task.name}</p>
      <div>
        <RemoveTaskButton task={props.task} todoId={props.todoId} />
      </div>
    </div>
  );
};
