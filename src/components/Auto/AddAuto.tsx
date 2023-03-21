import useAuth from "../../contexts/AuthContext";
import React, { useRef, useState } from "react";
import TimeInterval from "../../helpers/TimeInterval";
import { update } from "firebase/database";
import IAuto from "../../interface/IAuto";
import { calculateNextUpdateTime } from "../../helpers/date-time-calculations";
import { getAutosRef, getTasksRef } from "../../helpers/refs";
import getDatabaseKey from "../../helpers/get-db-key";
import SelectFreq from "./SelectFreq";
import AddButton from "../layout/AddButton";
import resetInputField from "../../helpers/resetInputField";
import requireNonNull from "../../helpers/requireNonNull";
import { Flex, FormControl, Input } from "@chakra-ui/react";

interface AddAutoProps {
  todoId: string;
  todoName: string;
}

const maxTaskNameLength: number = 100;
const AddAuto: React.FC<AddAutoProps> = (props) => {
  const { todoId, todoName } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const currUser = useAuth().getCurrUser();
  const [freq, setFreq] = useState<TimeInterval>(TimeInterval.DAY);
  const [time, setTime] = useState<string>("23:59");

  function addAutomaticTask(e: React.FormEvent): void {
    e.preventDefault();
    requireNonNull(inputRef.current);
    const taskName = inputRef.current!.value.trim();
    if (taskName.length === 0) {
      return;
    }

    const tasksRef = getTasksRef(currUser.uid, todoId);
    const autosRef = getAutosRef(currUser.uid, todoId);
    const taskId = getDatabaseKey(tasksRef);

    const nextUpdate: Date = calculateNextUpdateTime(freq, time);

    const auto: IAuto = {
      id: taskId,
      todoId: todoId,
      todoName: todoName,
      name: taskName.substring(0, maxTaskNameLength),
      nextUpdate: nextUpdate,
      freq: freq,
      timeOffset: time,
      isCompleted: false,
      isImportant: false,
    };

    resetInputField(inputRef);
    update(autosRef, { [`${taskId}`]: auto });
  }

  return (
    <FormControl w="100%">
      <form onSubmit={addAutomaticTask}>
        <Flex gap={1} padding={1} flexWrap="wrap" w="100%">
          <Input
            flexGrow={1}
            ref={inputRef}
            type="text"
            placeholder="Task name"
            required
            flexBasis="50%"
          />
          <Flex flexBasis="50%" flexGrow={1} gap={1} align="center">
            <Flex gap={1} flexGrow={1}>
              <SelectFreq
                onChange={(interval: TimeInterval) => {
                  setFreq(interval);
                }}
              />
              <Input
                type="time"
                onChange={(e) => setTime(e.target.value)}
                defaultValue="23:59"
              />
              <AddButton />
            </Flex>
          </Flex>
        </Flex>
      </form>
    </FormControl>
  );
};

export default AddAuto;
