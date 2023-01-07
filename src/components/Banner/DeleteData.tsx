import {
  Box,
  Button,
  DarkMode,
  LightMode,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import ConfirmationModal from "../layout/ConfirmationModal";
import { getTodosRef } from "../../helpers/refs";
import useAuth from "../../contexts/AuthContext";
import { DatabaseReference, remove } from "firebase/database";

export const DeleteData: React.FC<{}> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const uid: string = useAuth().getCurrUser().uid;
  const todosRef: DatabaseReference = getTodosRef(uid);

  function deleteAllTodos(): void {
    remove(todosRef);
    onClose();
  }

  return (
    <VStack align="start">
      <Button
        onClick={onOpen}
        borderColor="red"
        borderWidth={1}
        color="red"
        w="100%"
        _hover={{ backgroundColor: "#BF0000", color: "white" }}
      >
        Delete data
      </Button>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        actionToConfirm="clear all data"
        warning="This action is irreversible!"
        actionOnConfirm={deleteAllTodos}
        requireExtraConfirmation
      />
    </VStack>
  );
};
