import React, { useRef } from "react";
import { update } from "firebase/database";
import ITask from "../../interface/ITask";
import { User } from "firebase/auth";
import { getTasksRef } from "../../helpers/refs";
import getDatabaseKey from "../../helpers/getDatabaseKey";
import resetInputField from "../../helpers/resetInputField";
import useAuth from "../../contexts/AuthContext";
import buttonStyles from "../../styles/Button.module.css";
import formStyles from "../../styles/Form.module.css";

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

  function addManualTask(user: User, todoId: string, taskName: string) {
    const currUser = user;
    const tasksRef = getTasksRef(currUser.uid, todoId);
    const taskId = getDatabaseKey(tasksRef);

    const task: ITask = {
      id: taskId,
      todoId: todoId,
      name: taskName,
      isAuto: false,
      isCompleted: false,
    };

    update(tasksRef, { [`${taskId}`]: task }).then(() =>
      resetInputField(taskRef)
    );
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
