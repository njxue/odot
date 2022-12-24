import { Button, Flex, Heading, Image, VStack } from "@chakra-ui/react";

interface GreetingCardProps {
  text?: string;
  onClickButtonEvent?: () => void;
  buttonText?: string;
}

const GreetingCard: React.FC<GreetingCardProps> = (props) => {
  const { text, onClickButtonEvent, buttonText } = props;
  return (
    <VStack
      gap={3}
      bgColor="#00494c"
      color="white"
      h="100%"
      justifyContent="center"
      padding={30}
      minH="500px"
    >
      <Image src={require("../../assets/logo.png")} />
      <Heading size="md">{text}</Heading>
      <Button
        bgColor="teal"
        _hover={{ bgColor: "teal.500" }}
        w="300px"
        onClick={onClickButtonEvent}
      >
        {buttonText}
      </Button>
    </VStack>
  );
};

export default GreetingCard;
