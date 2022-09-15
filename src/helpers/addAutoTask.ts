import { update } from "firebase/database";
import ITask from "../interface/ITask";
import { User } from "firebase/auth";
import TimeInterval from "./TimeInterval";
import { calculateNextUpdateTime } from "./DateTimeCalculations";
import { getAutosRef, getTasksRef } from "./refs";
import getDatabaseKey from "./getDatabaseKey";

function addAutoTask(
  user: User,
  todoId: string,
  taskName: string,
  freq: TimeInterval
) {
  const currUser = user;
  const tasksRef = getTasksRef(currUser.uid, todoId);
  const autosRef = getAutosRef(currUser.uid, todoId);
  const taskId = getDatabaseKey(tasksRef);

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
