import useAuth from "../../contexts/AuthContext";
import formStyles from "../../styles/Form.module.css";
import buttonStyles from "../../styles/Button.module.css";
import autoStyles from "../../styles/Auto.module.css";
import React, { useRef, useState } from "react";
import TimeInterval from "../../helpers/TimeInterval";
import { update } from "firebase/database";
import IAuto from "../../interface/IAuto";
import { calculateNextUpdateTime } from "../../helpers/DateTimeCalculations";
import { getAutosRef, getTasksRef } from "../../helpers/refs";
import getDatabaseKey from "../../helpers/getDatabaseKey";
import SelectFreq from "./SelectFreq";
import AddButton from "../layout/AddButton";
import resetInputField from "../../helpers/resetInputField";

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

    if (inputRef.current == null) {
      // error
      return;
    }

    const taskName = inputRef.current.value.trim();

    if (taskName.length == 0) {
      return;
    }

    const tasksRef = getTasksRef(currUser.uid, todoId);
    const autosRef = getAutosRef(currUser.uid, todoId);
    const taskId = getDatabaseKey(tasksRef);

    const dueDate: Date = calculateNextUpdateTime(freq);

    const auto: IAuto = {
      id: taskId,
      todoId: todoId,
      todoName: todoName,
      name: taskName.substring(0, maxTaskNameLength),
      nextUpdate: dueDate,
      dueDate: dueDate,
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
      <input ref={inputRef} type="text" placeholder="Task name" />
      <SelectFreq onChange={handleChange} />
      <AddButton />
    </form>
  );
};

export default AddAuto;
