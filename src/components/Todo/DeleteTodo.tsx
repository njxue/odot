import { Button, useDisclosure } from "@chakra-ui/react";
import { remove } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import { getTodoRef } from "../../helpers/refs";
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
      <Button
        colorScheme="red"
        variant="outline"
        onClick={onOpen}
        w="100%"
        _hover={{ backgroundColor: "maroon", color: "white" }}
      >
        Delete this todo
      </Button>
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
