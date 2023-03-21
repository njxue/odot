import IAuto from "../../interface/IAuto";
import { getAutoRef, getTasksRef } from "../../helpers/refs";
import useAuth from "../../contexts/AuthContext";
import { remove, update } from "firebase/database";
import { useState } from "react";
import SelectFreq from "./SelectFreq";
import TimeInterval, { intervalToFreq } from "../../helpers/TimeInterval";
import { calculateNextUpdateTime } from "../../helpers/date-time-calculations";
import { DeleteAuto } from "./DeleteAuto";
import { PushAuto } from "./PushAuto";
import { Flex, HStack, Input, Text } from "@chakra-ui/react";

interface AutoProps {
  task: IAuto;
}

const Auto: React.FC<AutoProps> = (props) => {
  const { task } = props;
  const autoRef = getAutoRef(useAuth().getCurrUser().uid, task.todoId, task.id);
  const tasksRef = getTasksRef(useAuth().getCurrUser().uid, task.todoId);

  function handleDelete(): void {
    remove(autoRef);
  }

  function handleIntervalChange(interval: TimeInterval): void {
    update(autoRef, {
      nextUpdate: calculateNextUpdateTime(interval, task.timeOffset),
      freq: intervalToFreq(interval),
    });
  }

  function handleTimeChange(time: string): void {
    update(autoRef, {
      nextUpdate: calculateNextUpdateTime(task.freq, task.timeOffset),
      timeOffset: time,
    });
  }

  // Pushes the auto into the main list of tasks
  // An alternative is to update nextUpdateTime to current time, but this will not trigger a re-render because there isn't an onValue
  // listener for Autos (it uses get, not onValue)
  function forcePush(): void {
    const dueDate: Date = task.nextUpdate;
    update(tasksRef, {
      [task.id]: { ...task, dueDate, freq: null, nextUpdate: null },
    });
  }

  return (
    <Flex padding={1} paddingLeft={2} align="center" flexWrap="wrap">
      <Text flexGrow={1}>{task.name}</Text>
      <HStack alignItems="center">
        <SelectFreq
          onChange={handleIntervalChange}
          defaultValue={task.freq.toString()}
        />
        <Input
          type="time"
          defaultValue={task.timeOffset}
          onChange={(e) => handleTimeChange(e.target.value)}
        />

        <HStack alignItems="center">
          <DeleteAuto handleDelete={handleDelete} />
          <PushAuto forcePush={forcePush} />
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Auto;
