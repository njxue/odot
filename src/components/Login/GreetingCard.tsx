import { Button, Heading, Image, VStack } from "@chakra-ui/react";

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
    >
      <Image src={require("../../assets/logo.png")} w="50%" />
      <Heading size="md" textAlign="center">
        {text}
      </Heading>
      <Button
        bgColor="teal"
        _hover={{ bgColor: "teal.500" }}
        w="50%"
        minW="200px"
        onClick={onClickButtonEvent}
      >
        {buttonText}
      </Button>
    </VStack>
  );
};

export default GreetingCard;
