import { Box, Flex, VStack, Heading, Divider, Center } from "@chakra-ui/react";
import styles from "../../styles/PreLogin.module.css";

interface PreLoginFormProps {
  header: string;
  children: React.ReactNode;
  text?: string;
}

const PreLoginForm: React.FC<PreLoginFormProps> = (props) => {
  return (
    <Center h="100%" justifyContent="center">
      <VStack w="50%" minW="300px">
        <VStack alignItems="start" w="100%">
          <Heading>{props.header}</Heading>
          <Divider borderColor="black" />
        </VStack>
        <p>{props.text}</p>
        {props.children}
      </VStack>
    </Center>
  );
};

export default PreLoginForm;
