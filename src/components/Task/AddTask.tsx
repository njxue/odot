import React, { useRef } from "react";
import { update } from "firebase/database";
import ITask from "../../interface/ITask";
import { User } from "firebase/auth";
import { getTasksRef } from "../../helpers/refs";
import getDatabaseKey from "../../helpers/getDatabaseKey";
import resetInputField from "../../helpers/resetInputField";
import useAuth from "../../contexts/AuthContext";
import formStyles from "../../styles/Form.module.css";
import AddButton from "../layout/AddButton";
import { getTimeNow, getDateString } from "../../helpers/DateTimeCalculations";

interface AddTaskProps {
  todoId: string;
  todoName: string;
}

const maxTaskNameLength: number = 100;
const AddTask: React.FC<AddTaskProps> = (props) => {
  const { todoId, todoName } = props;
  const taskRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const currUser = useAuth().getCurrUser();

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    const taskName = taskRef.current?.value;
    const dueDate = dateRef.current?.value;

    if (
      taskName == undefined ||
      taskName.trim().length == 0 ||
      dueDate == undefined
    ) {
      console.log("ERRORRRR");
    } else {
      addManualTask(currUser, todoId, taskName, dueDate);
    }
  }

  function addManualTask(
    user: User,
    todoId: string,
    taskName: string,
    dueDate: string
  ) {
    const currUser = user;
    const tasksRef = getTasksRef(currUser.uid, todoId);
    const taskId = getDatabaseKey(tasksRef);
    const task: ITask = {
      id: taskId,
      todoId: todoId,
      todoName: todoName,
      name: taskName.substring(0, maxTaskNameLength),
      isCompleted: false,
      isImportant: false,
      dueDate: new Date(dueDate),
    };

    resetInputField(taskRef);
    resetInputField(dateRef);

    update(tasksRef, { [`${taskId}`]: task });
  }

  return (
    <form onSubmit={handleAdd} className={formStyles.form}>
      <input ref={taskRef} type="text" placeholder="Task" />
      <input ref={dateRef} type="date" min={getDateString(getTimeNow())} />
      <AddButton />
    </form>
  );
};

export default AddTask;
