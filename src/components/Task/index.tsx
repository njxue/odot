import ITask from "../../interface/ITask";
import ToggleCompletionStatusButton from "./ToggleCompletionStatusButton";
import styles from "../../styles/Task.module.css";
import RemoveTaskButton from "./RemoveTaskButton";
import ToggleImportance from "./ToggleImportance";
import { DueDate } from "./DueDate";
import {
  Badge,
  Box,
  Button,
  Flex,
  Input,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { getTaskRef } from "../../helpers/refs";
import useAuth from "../../contexts/AuthContext";
import { update } from "firebase/database";
import {
  getDateString,
  getTimeNow,
} from "../../helpers/date-time-calculations";
import { maxTaskNameLength } from "../../helpers/global-constants";

interface TaskProps {
  task: ITask;
  withLabel?: boolean;
}

export const Task: React.FC<TaskProps> = (props) => {
  const { task, withLabel } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const uid = useAuth().getCurrUser().uid;

  const bgColor = useColorModeValue("white", "transparent");
  const borderColor = useColorModeValue("transparent", "whiteAlpha.600");
  const hoverStyles = useColorModeValue(
    { boxShadow: "2px 3px gray", borderColor: "black", fontWeight: "bold" },
    { boxShadow: "2px 3px lightgray", borderColor: "white", fontWeight: "bold" }
  );

  function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    const taskName: string | undefined = inputRef.current?.value;
    if (taskName === undefined || taskName.trim().length == 0) {
      return;
    }

    let dueDate: string | undefined | null = dateRef.current?.value;
    if (dueDate === undefined) {
      return;
    }

    if (dueDate == "") {
      dueDate = null;
    }

    const taskRef = getTaskRef(uid, task.todoId, task.id);
    update(taskRef, { name: taskName.trim().substring(0, maxTaskNameLength), dueDate }).then(() =>
      setIsEditing(false)
    );
  }

  return (
    <Box
      bg={bgColor}
      _hover={hoverStyles}
      style={isEditing ? hoverStyles : {}}
      borderRadius={5}
      borderWidth={1}
      borderColor={borderColor}
    >
      <div className={styles.task}>
        <div className={styles.details}>
          <Flex flexGrow={1}>
            <Box>
              {!isEditing && (
                <ToggleCompletionStatusButton
                  task={task}
                  completed={task.isCompleted}
                />
              )}
            </Box>
            <Box flexGrow={1}>
              {isEditing ? (
                <form onSubmit={handleEdit}>
                  <Input
                    required
                    ref={inputRef}
                    type="text"
                    defaultValue={task.name}
                    backgroundColor={bgColor}
                  />
                </form>
              ) : (
                <Text noOfLines={2}>{task.name}</Text>
              )}
            </Box>
          </Flex>
          <div className={styles.labels}>
            {!isEditing && task.dueDate && <DueDate dueDate={task.dueDate} />}
            {isEditing && (
              <Input
                type="date"
                ref={dateRef}
                defaultValue={
                  task.dueDate ? getDateString(new Date(task.dueDate)) : ""
                }
                min={getDateString(getTimeNow())}
              />
            )}
            {withLabel == true && <Badge>{task.todoName}</Badge>}
          </div>
        </div>

        <div className={styles.controls}>
          {!isEditing && (
            <ToggleImportance task={task} disabled={task.isCompleted} />
          )}
          {!isEditing && <RemoveTaskButton task={task} />}
          {isEditing ? (
            <Flex wrap="nowrap" gap={3}>
              <CheckIcon cursor="pointer" onClick={handleEdit} />
              <CloseIcon cursor="pointer" onClick={() => setIsEditing(false)} />
            </Flex>
          ) : (
            <Tooltip label="Edit">
              <EditIcon
                cursor="pointer"
                onClick={() => setIsEditing(!isEditing)}
              />
            </Tooltip>
          )}
        </div>
      </div>
    </Box>
  );
};
