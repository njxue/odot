import React, { useRef } from "react";
import { update } from "firebase/database";
import ITask from "../../interface/ITask";
import { User } from "firebase/auth";
import { getTasksRef } from "../../helpers/refs";
import getDatabaseKey from "../../helpers/get-db-key";
import resetInputField from "../../helpers/resetInputField";
import useAuth from "../../contexts/AuthContext";
import { useColorModeValue } from "@chakra-ui/react";
import AddButton from "../layout/AddButton";
import {
  getTimeNow,
  getDateTimeString,
  toEndOfDay,
} from "../../helpers/date-time-calculations";
import { maxTaskNameLength } from "../../helpers/global-constants";
import requireNonNull from "../../helpers/requireNonNull";
import { Flex, FormControl, Input } from "@chakra-ui/react";

interface AddTaskProps {
  todoId: string;
  todoName: string;
}

const AddTask: React.FC<AddTaskProps> = (props) => {
  const { todoId, todoName } = props;
  const taskRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const currUser = useAuth().getCurrUser();

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    let taskName: string | undefined = taskRef.current?.value;
    let dueDate: string | undefined = dateRef.current?.value;

    requireNonNull(taskName, dueDate);

    taskName = taskName!.trim();
    if (taskName.length === 0) {
      return;
    }
    console.log(dueDate);
    addManualTask(currUser, todoId, taskName, dueDate!);
  }

  function addManualTask(
    user: User,
    todoId: string,
    taskName: string,
    dueDate: string
  ) {
    console.log(dueDate);
    const currUser = user;
    const tasksRef = getTasksRef(currUser.uid, todoId);
    const taskId = getDatabaseKey(tasksRef);
    const task: ITask = {
      id: taskId,
      todoId: todoId,
      todoName: todoName,
      name: taskName.substring(0, maxTaskNameLength),
      isCompleted: false,
      isImportant: false,
      dueDate: new Date(dueDate),
    };

    resetInputField(taskRef);
    resetInputField(dateRef);

    update(tasksRef, { [`${taskId}`]: task });
  }

  return (
    <FormControl maxW="100%">
      <form onSubmit={handleAdd}>
        <Flex w="100%" gap={1} flexWrap="wrap" alignItems="center">
          <Flex w="75%" gap={1} flexWrap="wrap" flexGrow={1}>
            <Input
              bg={useColorModeValue("whiteAlpha.900", "transparent")}
              ref={taskRef}
              flexGrow={1}
              flexBasis="500px"
              type="text"
              placeholder="Task"
              required
            />
            <Flex gap={1} flexGrow={1} maxW="100%">
              <Input
                fontSize="sm"
                bg={useColorModeValue("whiteAlpha.900", "transparent")}
                
                ref={dateRef}
                type="datetime-local"
                min={getDateTimeString(getTimeNow())}
              />
              <AddButton />
            </Flex>
          </Flex>
        </Flex>
      </form>
    </FormControl>
  );
};

export default AddTask;
