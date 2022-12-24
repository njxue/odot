import { Tooltip, useDisclosure } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import SettingsModal from "./SettingsModal";

export const Settings: React.FC<{ todoId: string }> = (props) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <>
      <SettingsModal isOpen={isOpen} onClose={onClose} todoId={props.todoId} />
      <Tooltip label="configure">
        <SettingsIcon onClick={onOpen} cursor="pointer" />
      </Tooltip>
    </>
  );
};
