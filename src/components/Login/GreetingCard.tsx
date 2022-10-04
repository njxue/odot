import { Button, Flex, Heading, VStack } from "@chakra-ui/react";

const GreetingCard: React.FC<{}> = () => {
  return (
    <Flex
      bgColor="teal"
      flexGrow="1"
      color="white"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading>Sign up</Heading>
      <Heading size="md">Lorem Ipsum Logo</Heading>
      <Button colorScheme="pink">Register</Button>
    </Flex>
  );
};

export default GreetingCard;
