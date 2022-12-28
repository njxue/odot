import React from "react";
import { useWindowDimensions } from "../../helpers/useWindowDimensions";
import { Box, Flex } from "@chakra-ui/react";

interface PreLoginLayoutProps {
  greetingComponent: React.ReactNode;
  formComponent: React.ReactNode;
}

const PreLoginLayout: React.FC<PreLoginLayoutProps> = (props) => {
  const { width } = useWindowDimensions();
  const { greetingComponent, formComponent } = props;
  return (
    <Flex
      direction={width > 700 ? "row" : "column"}
      w="100vw"
      h="100vh"
    >
      <Box flexGrow={2} h="100%">
        {greetingComponent}
      </Box>
      <Box flexGrow={3} h="100%" padding={30}>
        {formComponent}
      </Box>
    </Flex>
  );
};

export default PreLoginLayout;
