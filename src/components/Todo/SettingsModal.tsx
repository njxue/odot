import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  Divider,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { onValue } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import React, { useEffect, useState } from "react";
import IAuto from "../../interface/IAuto";
import { getAutosRef } from "../../helpers/refs";
import AddAuto from "./AddAuto";
import DeleteTodo from "./DeleteTodo";
import AutoCollections from "./AutoCollections";
import Loader from "../layout/Loader";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  todoId: string;
}

const SettingsModal: React.FC<SettingsModalProps> = (props) => {
  const { todoId, isOpen, onClose } = props;

  const currUser: User = useAuth().getCurrUser();
  const autosRef = getAutosRef(currUser.uid, todoId);

  const [autos, setAutos] = useState<IAuto[] | undefined>();

  useEffect(() => {
    onValue(autosRef, (snapshot) => {
      const value = snapshot.val();
      const tmp: IAuto[] = [];
      for (const key in value) {
        const task = value[key];
        tmp.push({ id: key, ...task });
      }
      setAutos(tmp);
    });
  }, []);

  return autos == undefined ? (
    <Loader />
  ) : (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <ModalHeader>Configure</ModalHeader>
          <Divider />
          <div>Automatic Additions:</div>
          <AutoCollections tasks={autos} todoId={todoId} />
          <AddAuto todoId={todoId} />
          <DeleteTodo todoId={todoId} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
