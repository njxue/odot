import useAuth from "../../contexts/AuthContext";
import formStyles from "../../styles/Form.module.css";
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

    const nextUpdate: Date = calculateNextUpdateTime(freq);

    const auto: IAuto = {
      id: taskId,
      todoId: todoId,
      todoName: todoName,
      name: taskName.substring(0, maxTaskNameLength),
      nextUpdate: nextUpdate,
      freq: freq,
      isCompleted: false,
      isImportant: false,
    };

    resetInputField(inputRef);
    update(autosRef, { [`${taskId}`]: auto });
  }

  function handleChange(interval: TimeInterval) {
    setFreq(interval);
  }

  return (
    <form onSubmit={addAutomaticTask} className={formStyles.form}>
      <input ref={inputRef} type="text" placeholder="Task name" required />
      <SelectFreq onChange={handleChange} />
      <AddButton />
    </form>
  );
};

export default AddAuto;
