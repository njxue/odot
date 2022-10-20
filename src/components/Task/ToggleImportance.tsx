import { StarIcon } from "@chakra-ui/icons";
import { update } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import { getTaskRef } from "../../helpers/refs";
import ITask from "../../interface/ITask";

interface ToggleImportanceProps {
  task: ITask;
}
const ToggleImportance: React.FC<ToggleImportanceProps> = (props) => {
  const { task } = props;
  const taskRef = getTaskRef(useAuth().getCurrUser().uid, task.todoId, task.id);

  function toggleImportance(): void {
    update(taskRef, { isImportant: !task.isImportant });
  }

  return (
    <StarIcon
      color={task.isImportant ? "#FFBB00" : "#CECECE"}
      onClick={toggleImportance}
      cursor="pointer"
    />
  );
};

export default ToggleImportance;
