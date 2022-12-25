import { Tooltip, useDisclosure } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import SettingsModal from "./SettingsModal";

export const Settings: React.FC<{ todoId: string; todoName: string }> = (
  props
) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <>
      <SettingsModal
        isOpen={isOpen}
        onClose={onClose}
        todoId={props.todoId}
        todoName={props.todoName}
      />
      <Tooltip label="configure">
        <SettingsIcon onClick={onOpen} cursor="pointer" />
      </Tooltip>
    </>
  );
};
