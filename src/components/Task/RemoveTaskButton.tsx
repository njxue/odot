import { db } from "../../config/firebase";
import { ref, remove, update } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import styles from "../../styles/Button.module.css";
import ITask from "../../interface/ITask";
import { calculateNextUpdateTime } from "../../helpers/DateTimeCalculations";
import { getAutoRef, getTaskRef } from "../../helpers/refs";

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
    update(autoRef, { nextUpdate: calculateNextUpdateTime(task.freq) });
  }

  function handleRemoveManual(): void {
    remove(taskRef);
  }

  return (
    <button className={styles.removeBtn} onClick={handleRemove}>
      remove
    </button>
  );
};

export default RemoveTaskButton;
