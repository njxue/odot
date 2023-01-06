import { AiOutlineSetting } from "react-icons/ai";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Icon,
} from "@chakra-ui/react";
import { ToggleTheme } from "./ToggleTheme";

export const GlobalSettings: React.FC<{}> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const body: HTMLElement = document.body;

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ToggleTheme />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Icon as={AiOutlineSetting} onClick={onOpen} />
    </>
  );
};
