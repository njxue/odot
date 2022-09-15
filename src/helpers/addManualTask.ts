import { update } from "firebase/database";
import ITask from "../interface/ITask";
import { User } from "firebase/auth";
import { getTasksRef } from "./refs";
import getDatabaseKey from "./getDatabaseKey";

function addManualTask(user: User, todoId: string, taskName: string) {
  const currUser = user;
  const tasksRef = getTasksRef(currUser.uid, todoId);
  const taskId = getDatabaseKey(tasksRef);

  const task: ITask = {
    id: taskId,
    todoId: todoId,
    name: taskName,
    isAuto: false,
  };

  update(tasksRef, { [`${taskId}`]: task });
}

export default addManualTask;
