import { StarIcon } from "@chakra-ui/icons";
import { update } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import { getTaskRef } from "../../helpers/refs";
import ITask from "../../interface/ITask";

interface ToggleImportanceProps {
  task: ITask;
  disabled?: boolean;
}
const ToggleImportance: React.FC<ToggleImportanceProps> = (props) => {
  const { task, disabled } = props;
  const taskRef = getTaskRef(useAuth().getCurrUser().uid, task.todoId, task.id);

  function toggleImportance(): void {
    if (task.isCompleted) {
      return;
    }
    update(taskRef, { isImportant: !task.isImportant });
  }

  return (
    <StarIcon
      color={task.isImportant ? "#FFBB00" : "#CECECE"}
      opacity={disabled ? "30%" : "100%"}
      onClick={toggleImportance}
      cursor={disabled ? "auto" : "pointer"}
    />
  );
};

export default ToggleImportance;
