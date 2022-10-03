import useAuth from "../../contexts/AuthContext";
import formStyles from "../../styles/Form.module.css";
import buttonStyles from "../../styles/Button.module.css";
import autoFormStyles from "../../styles/AddAutoForm.module.css";
import React, { useRef, useState } from "react";
import TimeInterval from "../../helpers/TimeInterval";
import { update } from "firebase/database";
import IAuto from "../../interface/IAuto";
import { calculateNextUpdateTime } from "../../helpers/DateTimeCalculations";
import { getAutosRef, getTasksRef } from "../../helpers/refs";
import getDatabaseKey from "../../helpers/getDatabaseKey";
import SelectFreq from "./SelectFreq";

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
    const taskName = inputRef.current?.value;

    if (taskName == undefined) {
      // error
      return;
    }
    const tasksRef = getTasksRef(currUser.uid, todoId);
    const autosRef = getAutosRef(currUser.uid, todoId);
    const taskId = getDatabaseKey(tasksRef);

    const auto: IAuto = {
      id: taskId,
      todoId: todoId,
      name: taskName,
      nextUpdate: calculateNextUpdateTime(freq),
      freq: freq,
      isCompleted: false,
    };

    update(autosRef, { [`${taskId}`]: auto });
  }

  function handleChange(interval: TimeInterval) {
    setFreq(interval);
  }

  return (
    <div className={autoFormStyles.autoForm}>
      <form className={formStyles.form} onSubmit={addAutomaticTask}>
        <input ref={inputRef} type="text" placeholder="Task name" />
        <SelectFreq onChange={handleChange} />
        <button type="submit" className={buttonStyles.addBtn}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddAuto;
