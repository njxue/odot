import ITask from "../../interface/ITask";
import ToggleCompletionStatusButton from "./ToggleCompletionStatusButton";
import styles from "../../styles/Task.module.css";
import RemoveTaskButton from "./RemoveTaskButton";
import ToggleImportance from "./ToggleImportance";
import { DueDate } from "./DueDate";
import { Badge, Box, Text, border, useColorModeValue } from "@chakra-ui/react";

interface TaskProps {
  task: ITask;
  withLabel?: boolean;
}

export const Task: React.FC<TaskProps> = (props) => {
  const { task, withLabel } = props;
  const bgColor = useColorModeValue("white", "transparent");
  const borderColor = useColorModeValue("transparent", "whiteAlpha.600");
  const hoverStyles = useColorModeValue(
    { boxShadow: "2px 3px gray", borderColor: "black", fontWeight: "bold" },
    { boxShadow: "2px 3px lightgray", borderColor: "white", fontWeight: "bold" }
  );
  return (
    <Box
      bg={bgColor}
      _hover={hoverStyles}
      borderRadius={5}
      borderWidth={1}
      borderColor={borderColor}
    >
      <div className={styles.task}>
        <div className={styles.details}>
          <div>
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
          <ToggleImportance task={task} disabled={task.isCompleted} />
          <RemoveTaskButton task={task} />
        </div>
      </div>
    </Box>
  );
};
