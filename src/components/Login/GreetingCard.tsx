import { Button, Flex, Heading, VStack } from "@chakra-ui/react";

interface GreetingCardProps {
  header: string;
  text: string;
  onClickButtonEvent?: () => void;
  buttonText?: string;
  buttonColor?: string;
  bgColor?: string;
}

const GreetingCard: React.FC<GreetingCardProps> = (props) => {
  const { header, text, onClickButtonEvent, buttonText, bgColor, buttonColor } =
    props;
  return (
    <Flex
      bgColor={bgColor ? bgColor : "teal"}
      flexGrow="1"
      color="white"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading>{header}</Heading>
      <Heading size="md">{text}</Heading>
      <Button
        bgColor={buttonColor ? buttonColor : "pink.700"}
        _hover={{ bgColor: buttonColor ? "teal.500" : "pink.600" }} // this feels too hacky, fix this
        onClick={onClickButtonEvent}
      >
        {buttonText}
      </Button>
    </Flex>
  );
};

export default GreetingCard;
