import { remove, update } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import styles from "../../styles/Button.module.css";
import ITask from "../../interface/ITask";
import IAuto from "../../interface/IAuto";
import { calculateNextUpdateTime } from "../../helpers/DateTimeCalculations";
import { getAutoRef, getTaskRef } from "../../helpers/refs";
import { VscCircleLargeFilled } from "react-icons/vsc";
import { Icon, Tooltip } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

interface RemoveTaskButtonProps {
  task: ITask;
  todoId: string;
}

const RemoveTaskButton: React.FC<RemoveTaskButtonProps> = (props) => {
  const { task, todoId } = props;
  const currUser = useAuth().getCurrUser();
  const autoRef = getAutoRef(currUser.uid, todoId, task.id);

  const taskRef = getTaskRef(currUser.uid, todoId, task.id);

  function handleRemove(): void {
    if (task.isAuto) {
      handleRemoveAuto();
    } else {
      handleRemoveManual();
    }
  }

  function handleRemoveAuto(): void {
    update(autoRef, {
      nextUpdate: calculateNextUpdateTime((task as IAuto).freq),
      isPushed: false,
    });
  }

  function handleRemoveManual(): void {
    remove(taskRef);
  }

  return (
    <Tooltip label="Completed">
      <CheckIcon
        _hover={{ cursor: "pointer" }}
        boxSize="15px"
        onClick={handleRemove}
      />
    </Tooltip>
  );
};

export default RemoveTaskButton;
