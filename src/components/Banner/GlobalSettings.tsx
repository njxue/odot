import { AiOutlineSetting } from "react-icons/ai";
import { HiSortAscending, HiSortDescending } from "react-icons/hi";
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
  Divider,
  IconButton,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { ToggleTheme } from "./ToggleTheme";
import { ChangeEvent } from "react";
import { SortMetric, SortOrder } from "../../helpers/tasks-sort";
import useUserPrefs from "../../contexts/UserPrefs";
import { DeleteData } from "./DeleteData";
import { lightSecondary, darkSecondary } from "../../styles/global-colours";

export const GlobalSettings: React.FC<{}> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setSortMetric, setSortOrder, sortOrder } = useUserPrefs();
  const bgColor = useColorModeValue("white", darkSecondary);

  function handleMetricChange(e: ChangeEvent<HTMLSelectElement>): void {
    let metric: SortMetric;
    try {
      metric = e.target.value as SortMetric;
    } catch (err) {
      metric = SortMetric.DATE_ADDED;
    }
    setSortMetric(metric);
  }

  function handleOrderChange(): void {
    const currentOrder = sortOrder;
    if (currentOrder === SortOrder.ASC) {
      setSortOrder(SortOrder.DSC);
    } else {
      setSortOrder(SortOrder.ASC);
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={bgColor}>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch">
              {/* ========================== Toggle theme ========================== */}
              <HStack justifyContent="space-between">
                <Text>Change theme: </Text>
                <ToggleTheme />
              </HStack>
              {/* ========================== Sort metric ========================== */}
              <HStack justifyContent="space-between">
                <Text>Sort Tasks By: </Text>
                <HStack w="200px">
                  <Select
                    onChange={handleMetricChange}
                    defaultValue={
                      localStorage.getItem("metric") == null
                        ? SortMetric.DATE_ADDED
                        : localStorage.getItem("metric")!
                    }
                    borderColor="gray.400"
                  >
                    <option>{SortMetric.DATE_ADDED}</option>
                    <option>{SortMetric.DUE_DATE}</option>
                    <option>{SortMetric.IMPORTANCE}</option>
                  </Select>

                  <IconButton
                    aria-label={sortOrder}
                    icon={
                      sortOrder === SortOrder.ASC ? (
                        <HiSortAscending />
                      ) : (
                        <HiSortDescending />
                      )
                    }
                    onClick={handleOrderChange}
                    borderColor="gray.400"
                    borderWidth={1}
                    variant="outline"
                  />
                </HStack>
              </HStack>
              {/* ========================== Delete Data ========================== */}
              <Divider />
              <DeleteData />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Icon as={AiOutlineSetting} onClick={onOpen} />
    </>
  );
};
