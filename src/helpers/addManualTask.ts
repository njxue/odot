import { child, DatabaseReference, push, update, ref } from "firebase/database";
import TaskList from "../components/TaskList";
import { db } from "../config/firebase";
import useAuth from "../contexts/AuthContext";
import ITask from "../interface/ITask";
import { User } from "firebase/auth";
import { getTasksRef } from "./refs";

function addManualTask(user: User, todoId: string, taskName: string) {
  const currUser = user;
  const tasksRef = getTasksRef(currUser.uid, todoId);
  const taskId = push(tasksRef).key;

  if (!taskId) {
    // error
    return;
  }
  const task: ITask = {
    id: taskId,
    todoId: todoId,
    name: taskName,
    isAuto: false,
  };

  update(tasksRef, { [`${taskId}`]: task });
}

export default addManualTask;
