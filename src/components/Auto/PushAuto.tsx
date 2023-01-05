import { Tooltip, Icon } from "@chakra-ui/react";
import { IoPush } from "react-icons/io5";

export const PushAuto: React.FC<{ forcePush: () => void }> = (props) => {
  const { forcePush } = props;
  return (
    <Tooltip label="Push to list">
      <span>
        <Icon as={IoPush} onClick={forcePush} cursor="pointer" boxSize={5} />
      </span>
    </Tooltip>
  );
};
