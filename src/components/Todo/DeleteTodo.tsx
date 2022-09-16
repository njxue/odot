import { remove } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import { getTodoRef } from "../../helpers/refs";
import styles from "../../styles/Button.module.css";

const DeleteTodo: React.FC<{ todoId: string }> = (props) => {
  const { todoId } = props;
  const todoRef = getTodoRef(useAuth().getCurrUser().uid, todoId);

  function handleDelete(): void {
    remove(todoRef);
  }

  return (
    <button className={styles.removeBtn} onClick={handleDelete}>
      Delete this todo
    </button>
  );
};

export default DeleteTodo;
