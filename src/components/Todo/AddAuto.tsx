import useAuth from "../../contexts/AuthContext";
import formStyles from "../../styles/Form.module.css";
import React, { useRef, useState } from "react";
import TimeInterval from "../../helpers/TimeInterval";
import addAutoTask from "../../helpers/addAutoTask";

interface AddAutoProps {
  todoId: string;
}

const AddAuto: React.FC<AddAutoProps> = (props) => {
  const { todoId } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const currUser = useAuth().getCurrUser();
  const [freq, setFreq] = useState<TimeInterval>(TimeInterval.DAY);
  const intervals: TimeInterval[] = [
    TimeInterval.DAY,
    TimeInterval.WEEK,
    TimeInterval.MONTH,
    TimeInterval.SECONDS,
  ];

  function addAutomaticTask(e: React.FormEvent): void {
    e.preventDefault();
    const taskName = inputRef.current?.value;

    if (taskName == undefined) {
      // error
      return;
    }
    addAutoTask(currUser, todoId, taskName, freq);
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value: number = parseInt(e.target.value);

    setFreq(intervals[value]);
  }

  return (
    <form className={formStyles.form} onSubmit={addAutomaticTask}>
      <input ref={inputRef} type="text" placeholder="Foo" />
      <select name="updateFreq" onChange={handleChange}>
        <option value="0">Day</option>
        <option value="1">Week</option>
        <option value="2">Month</option>
        <option value="3">5 seconds</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddAuto;
