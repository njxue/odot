import { Tooltip, Icon } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

export const PushAuto: React.FC<{ forcePush: () => void }> = (props) => {
  const { forcePush } = props;
  return (
    <Tooltip label="Push to list">
      <ArrowForwardIcon onClick={forcePush} cursor="pointer" boxSize={5} />
    </Tooltip>
  );
};
