import { db } from "../../config/firebase";
import { ref, remove, update } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import styles from "../../styles/Button.module.css";
import ITask from "../../interface/ITask";
import { calculateNextUpdateTime } from "../../helpers/DateTimeCalculations";

interface RemoveTaskButtonProps {
  task: ITask;
  todoId: String;
}

const RemoveTaskButton: React.FC<RemoveTaskButtonProps> = (props) => {
  const { task, todoId } = props;
  const currUser = useAuth().getCurrUser();
  const autoRef = ref(
    db,
    `users/${currUser.uid}/todos/${todoId}/autos/${task.id}`
  );

  const taskRef = ref(
    db,
    `users/${currUser.uid}/todos/${todoId}/tasks/${task.id}`
  );

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
