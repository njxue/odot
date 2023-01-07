import { WarningIcon } from "@chakra-ui/icons";
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
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import requireNonNull from "../../helpers/requireNonNull";

interface ModalProps {
  actionToConfirm: string;
  warning?: string;
  requireExtraConfirmation?: boolean;
  isOpen: boolean;
  actionOnConfirm: () => any;
  onClose: () => any;
}

const confirmationString: string = "Confirm";
const ConfirmationModal: React.FC<ModalProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [incorrectText, setIncorrectText] = useState<boolean>(false);

  function extraConfirmation(): void {
    requireNonNull(inputRef);
    setIncorrectText(false);
    const input: string = inputRef.current!.value;
    if (input === confirmationString) {
      actionOnConfirm();
    } else {
      setIncorrectText(true);
    }
  }

  const {
    isOpen,
    actionToConfirm,
    warning,
    onClose,
    actionOnConfirm,
    requireExtraConfirmation,
  } = props;
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
          {warning && (
            <HStack>
              <WarningIcon />
              <Text>WARNING: {warning}</Text>
            </HStack>
          )}

          {requireExtraConfirmation && (
            <Input
              type="text"
              ref={inputRef}
              placeholder={`Type "${confirmationString}" to confirm`}
              marginTop={3}
              isInvalid={incorrectText}
            />
          )}
          <ButtonGroup w="100%" display="flex" marginTop={3}>
            <Button
              onClick={
                requireExtraConfirmation ? extraConfirmation : actionOnConfirm
              }
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
