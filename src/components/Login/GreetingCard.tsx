import { Button, Flex, Heading, Image, VStack } from "@chakra-ui/react";

interface GreetingCardProps {
  header: string;
  text?: string;
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
      h="100%"
    >
      <VStack>
        <Image src={require("../../static/odotlogo.png")}  />
        <Heading size="md">{text}</Heading>
        <Heading>{header}</Heading>
        <Button
          bgColor={buttonColor ? buttonColor : "pink.700"}
          _hover={{ bgColor: buttonColor ? "teal.500" : "pink.600" }} // this feels too hacky, fix this
          w="300px"
          onClick={onClickButtonEvent}
        >
          {buttonText}
        </Button>
      </VStack>
    </Flex>
  );
};

export default GreetingCard;
