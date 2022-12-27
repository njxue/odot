import { Button, Icon } from "@chakra-ui/react";
import ITask from "../../interface/ITask";
import useAuth from "../../contexts/AuthContext";
import { getUserRef } from "../../helpers/refs";
import { update } from "firebase/database";
import { MdClearAll } from "react-icons/md";

function getRoute(task: ITask): string {
  return `todos/${task.todoId}/tasks/${task.id}`;
}

export const ClearAllTasks: React.FC<{ tasks: ITask[] }> = (props) => {
  const uid = useAuth().getCurrUser().uid;
  const batchUpdate: { [k: string]: null } = {};
  const userRef = getUserRef(uid);
  props.tasks.forEach((t) => {
    batchUpdate[getRoute(t)] = null;
  });

  function clearAll() {
    if (Object.keys(batchUpdate).length > 0) {
      update(userRef, batchUpdate);
    }
  }

  return (
    <Button onClick={clearAll} rightIcon={<Icon as={MdClearAll} />}>
      Clear
    </Button>
  );
};
