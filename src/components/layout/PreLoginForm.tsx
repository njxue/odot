import { Box, Flex, VStack, Heading, Divider } from "@chakra-ui/react";
import styles from "../../styles/PreLogin.module.css";

interface PreLoginFormProps {
  header: string;
  children: React.ReactNode;
  text?: string;
}

const PreLoginForm: React.FC<PreLoginFormProps> = (props) => {
  return (
    <Box
      flexGrow="1"
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100%"
    >
      <Flex
        direction="column"
        minW="200px"
        maxW="300px"
        w="50%"
        alignItems="start"
        gap="100px"
      >
        <VStack w="100%" alignItems="start">
          <Heading>{props.header}</Heading>
          <Divider borderColor="black" />
          <p>{props.text}</p>
        </VStack>
        <VStack alignItems="start" w="100%">
          {props.children}
        </VStack>
      </Flex>
    </Box>
  );
};

export default PreLoginForm;
