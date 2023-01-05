import { SettingsIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalHeader,
  Button,
  Switch,
  Text,
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
      <SettingsIcon onClick={onOpen} />
    </>
  );
};
