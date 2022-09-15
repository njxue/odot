import { child, DatabaseReference, push, update, ref } from "firebase/database";
import TaskList from "../components/TaskList";
import { db } from "../config/firebase";
import useAuth from "../contexts/AuthContext";
import ITask from "../interface/ITask";
import { User } from "firebase/auth";
import TimeInterval from "./TimeInterval";
import { calculateNextUpdateTime } from "./DateTimeCalculations";
import { getAutosRef, getTasksRef } from "./refs";

function addAutoTask(
  user: User,
  todoId: string,
  taskName: string,
  freq: TimeInterval
) {
  const currUser = user;
  const tasksRef = getTasksRef(currUser.uid, todoId);
  const autosRef = getAutosRef(currUser.uid, todoId);
  const taskId = push(tasksRef).key;

  if (!taskId) {
    // error
    return;
  }

  const task: ITask = {
    id: taskId,
    todoId: todoId,
    name: taskName,
    isAuto: true,
    nextUpdate: calculateNextUpdateTime(freq),
    freq: freq,
  };
  update(autosRef, { [`${taskId}`]: task });
}

export default addAutoTask;
