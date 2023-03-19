import { Badge } from "@chakra-ui/react";
import ITask from "../../interface/ITask";
import styles from "../../styles/Task.module.css";
import { DueDate } from "./DueDate";
export const TaskLabels: React.FC<{
  task: ITask;
  isEditing: boolean;
  withLabel?: boolean;
}> = (props) => {
  const { task, isEditing, withLabel } = props;
  return (
    <div className={styles.labels}>
      {!isEditing && task.dueDate && <DueDate dueDate={task.dueDate} />}
      {withLabel == true && <Badge>{task.todoName}</Badge>}
    </div>
  );
};
