import { useDisclosure } from "@chakra-ui/react";
import { remove } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import { getTodoRef } from "../../helpers/refs";
import styles from "../../styles/Button.module.css";
import ConfirmationModal from "../layout/ConfirmationModal";

const DeleteTodo: React.FC<{ todoId: string }> = (props) => {
  const { todoId } = props;
  const todoRef = getTodoRef(useAuth().getCurrUser().uid, todoId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleDelete(): void {
    remove(todoRef);
  }

  return (
    <>
      <button className={`${styles.btn} ${styles.removeBtn}`} onClick={onOpen}>
        Delete this todo
      </button>
      <ConfirmationModal
        actionToConfirm="delete this todo"
        isOpen={isOpen}
        onClose={onClose}
        actionOnConfirm={handleDelete}
      />
    </>
  );
};

export default DeleteTodo;
