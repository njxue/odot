import ITask from "../../interface/ITask";
import ToggleCompletionStatusButton from "./ToggleCompletionStatusButton";
import styles from "../../styles/Task.module.css";
import RemoveTaskButton from "./RemoveTaskButton";
import ToggleImportance from "./ToggleImportance";
import { DueDate } from "./DueDate";
import {
  Badge,
  Box,
  LightMode,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

interface TaskProps {
  task: ITask;
  withLabel?: boolean;
}

export const Task: React.FC<TaskProps> = (props) => {
  const { task, withLabel } = props;
  return (
    <Box
      bg={useColorModeValue("white", "transparent")}
      borderRadius={5}
      borderWidth={1}
      borderColor={useColorModeValue("transparent", "white")}
    >
      <div className={styles.task}>
        <div className={styles.details}>
          <div className={styles.name}>
            <ToggleCompletionStatusButton
              task={task}
              completed={task.isCompleted}
            />
            <Text noOfLines={2}>{task.name}</Text>
          </div>
          <div className={styles.labels}>
            {task.dueDate && <DueDate dueDate={task.dueDate} />}
            {withLabel == true && <Badge>{task.todoName}</Badge>}
          </div>
        </div>

        <div className={styles.controls}>
          {!task.isCompleted && <ToggleImportance task={task} />}
          <RemoveTaskButton task={task} />
        </div>
      </div>
    </Box>
  );
};
