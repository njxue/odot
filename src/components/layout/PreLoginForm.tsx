import { VStack, Heading, Divider, Center } from "@chakra-ui/react";

interface PreLoginFormProps {
  header: string;
  children: React.ReactNode;
  text?: string;
}

const PreLoginForm: React.FC<PreLoginFormProps> = (props) => {
  const { header, text, children } = props;
  return (
    <Center h="100%" justifyContent="center">
      <VStack w="50%" minW="250px">
        <VStack alignItems="start" w="100%">
          <Heading color="black">{header}</Heading>
          <Divider borderColor="black" />
        </VStack>
        <p>{text}</p>
        {children}
      </VStack>
    </Center>
  );
};

export default PreLoginForm;
