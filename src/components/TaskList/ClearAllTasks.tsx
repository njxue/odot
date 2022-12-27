import { Button } from "@chakra-ui/react";
import ITask from "../../interface/ITask";
import useAuth from "../../contexts/AuthContext";
import { getTaskRef, getUserRef } from "../../helpers/refs";
import { DatabaseReference, update } from "firebase/database";

function getRoute(task: ITask, uid: string): string {
  return `todos/${task.todoId}/tasks/${task.id}`;
}

export const ClearAllTasks: React.FC<{ tasks: ITask[] }> = (props) => {
  const uid = useAuth().getCurrUser().uid;
  const batchUpdate: { [k: string]: null } = {};
  const userRef = getUserRef(uid);
  props.tasks.forEach((t) => {
    batchUpdate[getRoute(t, uid)] = null;
  });

  function clearAll() {
    update(userRef, batchUpdate);
  }

  return <Button onClick={clearAll}>Clear All</Button>;
};
