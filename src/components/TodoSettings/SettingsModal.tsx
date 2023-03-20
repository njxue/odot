import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  Divider,
  Heading,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { Unsubscribe, onValue } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import React, { useEffect, useState } from "react";
import IAuto from "../../interface/IAuto";
import { getAutosRef } from "../../helpers/refs";
import AddAuto from "../Auto/AddAuto";
import DeleteTodo from "./DeleteTodo";
import AutoCollections from "../Auto/AutoCollections";
import Loader from "../layout/Loader";
import { QuestionIcon } from "@chakra-ui/icons";
import { darkSecondary, lightSecondary } from "../../styles/global-colours";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  todoId: string;
  todoName: string;
}

const SettingsModal: React.FC<SettingsModalProps> = (props) => {
  const { todoId, todoName, isOpen, onClose } = props;

  const currUser: User = useAuth().getCurrUser();
  const autosRef = getAutosRef(currUser.uid, todoId);

  const [autos, setAutos] = useState<IAuto[] | undefined>();

  const bgColor = useColorModeValue("white", darkSecondary);

  useEffect(() => {
    const unsubscribe: Unsubscribe = onValue(autosRef, (snapshot) => {
      const value = snapshot.val();
      const tmp: IAuto[] = [];
      for (const key in value) {
        const task = value[key];
        tmp.push({ id: key, ...task });
      }
      setAutos(tmp);
    });
    return unsubscribe;
  }, []);

  return autos == undefined ? (
    <Loader />
  ) : (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalCloseButton />
        <ModalBody>
          <ModalHeader>Configure</ModalHeader>
          <Divider />
          <Heading size="s" alignContent="center">
            Automatic Tasks
            <Tooltip
              hasArrow
              label="These tasks will be automatically pushed to the main list of tasks"
              placement="top-start"
            >
              <QuestionIcon color="gray" margin={1} />
            </Tooltip>
          </Heading>
          <Divider />
          <AutoCollections tasks={autos} />
          <AddAuto todoId={todoId} todoName={todoName} />
          <Divider h="10px" />
          <DeleteTodo todoId={todoId} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
