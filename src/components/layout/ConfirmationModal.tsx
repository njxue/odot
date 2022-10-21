import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

interface ModalProps {
  actionToConfirm: string;
  isOpen: boolean;
  actionOnConfirm: () => any;
  onClose: () => any;
}
const ConfirmationModal: React.FC<ModalProps> = (props) => {
  const { isOpen, actionToConfirm, onClose, actionOnConfirm } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Are you sure you want to <b>{actionToConfirm}</b> ?
          </Text>
          <ButtonGroup w="100%" display="flex" marginTop={5}>
            <Button
              onClick={actionOnConfirm}
              colorScheme="green"
              flexGrow={1}
              flexBasis={0}
            >
              Confirm
            </Button>
            <Button
              onClick={onClose}
              colorScheme="gray"
              flexGrow={1}
              flexBasis={0}
              variant="outline"
            >
              Cancel
            </Button>
          </ButtonGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
