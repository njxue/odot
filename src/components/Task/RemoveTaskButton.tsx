import { ref } from "../../config/firebase";
import useAuth from "../../contexts/AuthContext";
import styles from "../../styles/Task.module.css";

interface RemoveTaskButtonProps {
  taskId: String;
  todoId: String
}

const RemoveTaskButton: React.FC<RemoveTaskButtonProps> = (props) => {
  const currUser = useAuth().getCurrUser();
  const taskRef = ref.child(
    `users/${currUser.uid}/todos/${props.todoId}/tasks/${props.taskId}`
  );

  function handleRemove(): void {
    taskRef.remove((err) => {
     console.log(err);
    });
  }

  return <button className={styles.removeBtn}onClick={handleRemove}>remove</button>;
};

export default RemoveTaskButton;
