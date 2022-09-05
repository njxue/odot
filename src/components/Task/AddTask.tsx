import React, { useRef } from "react";
import { ref, child, push, update } from "firebase/database";
import { db } from "../../config/firebase";
import useAuth from "../../contexts/AuthContext";
import buttonStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/Form.module.css";
import addManualTask from "../../helpers/addManualTask";

interface AddTaskProps {
  todoId: string;
}

const AddTask: React.FC<AddTaskProps> = (props) => {
  const todoId = props.todoId;
  const taskRef = useRef<HTMLInputElement>(null);
  const currUser = useAuth().getCurrUser();

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    const taskName = taskRef.current?.value;

    if (taskName == undefined || taskName.trim().length == 0) {
      console.log("ERRORRRR");
    } else {
      addManualTask(currUser, todoId, taskName);
    }
  }

  return (
    <form onSubmit={handleAdd} className={formStyles.form}>
      <input ref={taskRef} type="text" placeholder="Task" />
      <button className={buttonStyles.addBtn} type="submit">
        Add task
      </button>
    </form>
  );
};

export default AddTask;
