import { child, DatabaseReference, push, update, ref } from "firebase/database";
import TaskList from "../components/TaskList";
import { db } from "../config/firebase";
import useAuth from "../contexts/AuthContext";
import ITask from "../interface/ITask";
import { User } from "firebase/auth";
import TimeInterval from "./TimeInterval";
import { calculateNextUpdateTime } from "./DateTimeCalculations";

function addAutoTask(
  user: User,
  todoId: string,
  taskName: string,
  freq: TimeInterval
) {
  const currUser = user;
  const tasksRef = ref(db, `/users/${currUser.uid}/todos/${todoId}/tasks`);
  const autosRef = ref(db, `/users/${currUser.uid}/todos/${todoId}/autos`);
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
  };

  update(tasksRef, { [`${taskId}`]: task });
  update(autosRef, { [`${taskId}`]: task });
}

export default addAutoTask;
