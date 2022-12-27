import { remove } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import ITask from "../../interface/ITask";
import { getTaskRef } from "../../helpers/refs";
import { Tooltip } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface RemoveTaskButtonProps {
  task: ITask;
}

const RemoveTaskButton: React.FC<RemoveTaskButtonProps> = (props) => {
  const { task } = props;
  const currUser = useAuth().getCurrUser();
  const taskRef = getTaskRef(currUser.uid, task.todoId, task.id);

  function handleRemove(): void {
    remove(taskRef);
  }

  return (
    <Tooltip label="Delete">
      <DeleteIcon
        _hover={{ cursor: "pointer" }}
        boxSize="15px"
        onClick={handleRemove}
        color="#CECECE"
      />
    </Tooltip>
  );
};

export default RemoveTaskButton;
