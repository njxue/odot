import ITask from "../../interface/ITask";
import ToggleCompletionStatusButton from "./ToggleCompletionStatusButton";
import styles from "../../styles/Task.module.css";
import {
  Box,
  Center,
  Flex,
  FormControl,
  Input,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { getTaskRef } from "../../helpers/refs";

import useAuth from "../../contexts/AuthContext";
import { update } from "firebase/database";

import {
  getDateTimeString,
  getTimeNow,
} from "../../helpers/date-time-calculations";
import { useWindowDimensions } from "../../helpers/useWindowDimensions";
import { maxTaskNameLength } from "../../helpers/global-constants";

import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

import { TaskControls } from "./TaskControls";
import { TaskLabels } from "./TaskLabels";

interface TaskProps {
  task: ITask;
  withLabel?: boolean;
}

export const Task: React.FC<TaskProps> = (props) => {
  const { task, withLabel } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const uid = useAuth().getCurrUser().uid;

  const w = useWindowDimensions().width;

  const bgColor = useColorModeValue("white", "transparent");
  const borderColor = useColorModeValue("transparent", "whiteAlpha.600");
  const hoverStyles = useColorModeValue(
    { boxShadow: "2px 3px gray", borderColor: "black", fontWeight: "bold" },
    { boxShadow: "2px 3px lightgray", borderColor: "white", fontWeight: "bold" }
  );

  function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
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
    update(taskRef, {
      name: taskName.trim().substring(0, maxTaskNameLength),
      dueDate,
    }).then(() => {
      setIsEditing(false);
      setIsLoading(false);
    });
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
          <Flex flexGrow={1} maxW="100%">
            {!isEditing && (
              <ToggleCompletionStatusButton
                task={task}
                completed={task.isCompleted}
              />
            )}

            <Box flexGrow={1} maxW="100%">
              {isEditing ? (
                <Flex flexWrap="wrap" alignItems="center" w="100%" gap={3}>
                  <FormControl
                    flexGrow={1}
                    flexBasis="90%"
                    maxW="100%"
                    overflow="hidden"
                  >
                    <form onSubmit={handleEdit}>
                      <Flex gap={1} flexWrap="wrap" w="100%">
                        <Input
                          required
                          flexGrow={1}
                          flexBasis="500px"
                          disabled={isLoading}
                          ref={inputRef}
                          type="text"
                          defaultValue={task.name}
                          backgroundColor={bgColor}
                        />

                        <Input
                          disabled={isLoading}
                          flexGrow={1}
                          fontSize="sm"
                          flexBasis="200px"
                          type="datetime-local"
                          ref={dateRef}
                          defaultValue={
                            task.dueDate
                              ? getDateTimeString(new Date(task.dueDate))
                              : ""
                          }
                          min={getDateTimeString(getTimeNow())}
                        />
                      </Flex>
                    </form>
                  </FormControl>

                  {isLoading ? (
                    <Center w="50px">
                      <Spinner />
                    </Center>
                  ) : (
                    <Flex wrap="nowrap" gap={3} w="50px">
                      <CheckIcon cursor="pointer" onClick={handleEdit} />
                      <CloseIcon
                        cursor="pointer"
                        onClick={() => setIsEditing(false)}
                      />
                    </Flex>
                  )}
                </Flex>
              ) : (
                <Text noOfLines={2}>{task.name}</Text>
              )}
            </Box>
          </Flex>
          {!isEditing && (
            <TaskLabels
              task={task}
              isEditing={isEditing}
              withLabel={withLabel}
            />
          )}
        </div>

        {!isEditing && <TaskControls task={task} setIsEditing={setIsEditing} />}
      </div>
    </Box>
  );
};
