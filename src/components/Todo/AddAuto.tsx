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

interface AddAutoProps {
  todoId: string;
}

const AddAuto: React.FC<AddAutoProps> = (props) => {
  const { todoId } = props;
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
      name: taskName,
      nextUpdate: dueDate,
      dueDate: dueDate,
      freq: freq,
      isCompleted: false,
      isImportant: false,
    };

    update(autosRef, { [`${taskId}`]: auto });
  }

  function handleChange(interval: TimeInterval) {
    setFreq(interval);
  }

  return (
    <div className={formStyles.form}>
      <form onSubmit={addAutomaticTask} className={autoStyles.autoForm}>
        <div className={autoStyles.autoFormInputs}>
          <input ref={inputRef} type="text" placeholder="Task name" />
          <SelectFreq onChange={handleChange} />
        </div>
        <AddButton />
      </form>
    </div>
  );
};

export default AddAuto;
