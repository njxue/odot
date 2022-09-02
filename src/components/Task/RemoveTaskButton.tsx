import { db } from "../../config/firebase";
import { ref, remove } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import styles from "../../styles/Button.module.css";

interface RemoveTaskButtonProps {
  taskId: String;
  todoId: String;
}

const RemoveTaskButton: React.FC<RemoveTaskButtonProps> = (props) => {
  const currUser = useAuth().getCurrUser();
  const taskRef = ref(
    db,
    `users/${currUser.uid}/todos/${props.todoId}/tasks/${props.taskId}`
  );

  function handleRemove(): void {
    remove(taskRef);
  }

  return (
    <button className={styles.removeBtn} onClick={handleRemove}>
      remove
    </button>
  );
};

export default RemoveTaskButton;
