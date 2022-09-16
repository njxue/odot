import useAuth from "../../contexts/AuthContext";
import formStyles from "../../styles/Form.module.css";
import React, { useRef, useState } from "react";
import TimeInterval from "../../helpers/TimeInterval";
import { update } from "firebase/database";
import IAuto from "../../interface/IAuto";
import { User } from "firebase/auth";
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
      isAuto: true,
      nextUpdate: calculateNextUpdateTime(freq),
      freq: freq,
      isPushed: false,
    };

    update(autosRef, { [`${taskId}`]: auto });
  }

  function handleChange(interval: TimeInterval) {
    setFreq(interval);
  }

  return (
    <form className={formStyles.form} onSubmit={addAutomaticTask}>
      <input ref={inputRef} type="text" placeholder="Foo" />
      <SelectFreq onChange={handleChange} />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddAuto;