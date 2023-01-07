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
  VStack,
  Text,
  HStack,
  Select,
} from "@chakra-ui/react";
import { ToggleTheme } from "./ToggleTheme";
import { ChangeEvent } from "react";
import { SORT_ORDER } from "../../helpers/tasks-sort";
import useUserPrefs from "../../contexts/UserPrefs";

export const GlobalSettings: React.FC<{}> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setSortOrder: (order: SORT_ORDER) => void = useUserPrefs().setSortOrder;

  function setSortingOrder(e: ChangeEvent<HTMLSelectElement>): void {
    const order: SORT_ORDER = e.target.value as SORT_ORDER;
    setSortOrder(order);
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch">
              <HStack justifyContent="space-between">
                <Text>Change theme: </Text>
                <ToggleTheme />
              </HStack>
              <HStack justifyContent="space-between">
                <Text>Sort Tasks By: </Text>
                <Select
                  w="150px"
                  onChange={setSortingOrder}
                  defaultValue={
                    localStorage.getItem("order") == null
                      ? SORT_ORDER.DATE_ADDED
                      : localStorage.getItem("order")!
                  }
                >
                  <option>{SORT_ORDER.DATE_ADDED}</option>
                  <option>{SORT_ORDER.DUE_DATE}</option>
                  <option>{SORT_ORDER.IMPORTANCE}</option>
                </Select>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Icon as={AiOutlineSetting} onClick={onOpen} />
    </>
  );
};
