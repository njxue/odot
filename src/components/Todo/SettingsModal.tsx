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
import React, { useEffect, useRef, useState } from "react";
import AutomatedTasks from "./AutomatedTasks";
import ITask from "../../interface/ITask";
import { getAutosRef } from "../../helpers/refs";
import AddAuto from "./AddAuto";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  todoId: string;
}

const SettingsModal: React.FC<SettingsModalProps> = (props) => {
  const { todoId, isOpen, onClose } = props;

  const currUser: User = useAuth().getCurrUser();
  const autosRef = getAutosRef(currUser.uid, todoId);

  const inputRef = useRef<HTMLInputElement>(null);
  const [autos, setAutos] = useState<ITask[] | undefined>();

  useEffect(() => {
    onValue(autosRef, (snapshot) => {
      const value = snapshot.val();
      const tmp: ITask[] = [];
      for (const key in value) {
        const task = value[key];
        tmp.push({ id: key, ...task });
      }
      setAutos(tmp);
    });
  }, []);

  return autos == undefined ? (
    <div>loading......</div>
  ) : (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <ModalHeader>Configure</ModalHeader>
          <Divider />
          <div>Automatic Additions:</div>
          <AutomatedTasks tasks={autos} todoId={todoId} />
          <AddAuto todoId={todoId} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
