import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { DatabaseReference, update } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import { getAutoRef, getTaskRef } from "../../helpers/refs";
import ITask from "../../interface/ITask";

interface ToggleCompletionStatusButtonProps {
  task: ITask;
  completed?: boolean;
}

const ToggleCompletionStatusButton: React.FC<
  ToggleCompletionStatusButtonProps
> = (props) => {
  const { task, completed } = props;
  const uid = useAuth().getCurrUser().uid;

  function toggleCompletionStatus(): void {
    let ref: DatabaseReference;

    if (task.isAuto) {
      ref = getAutoRef(uid, task.todoId, task.id);
    } else {
      ref = getTaskRef(uid, task.todoId, task.id);
    }
    update(ref, { isCompleted: !task.isCompleted });
  }

  return completed ? (
    <Tooltip label="Incomplete">
      <CloseIcon
        _hover={{ cursor: "pointer" }}
        boxSize="15px"
        onClick={toggleCompletionStatus}
      />
    </Tooltip>
  ) : (
    <Tooltip label="Done">
      <CheckIcon
        _hover={{ cursor: "pointer" }}
        boxSize="15px"
        onClick={toggleCompletionStatus}
      />
    </Tooltip>
  );
};

export default ToggleCompletionStatusButton;
