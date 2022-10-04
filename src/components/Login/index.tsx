import { Flex } from "@chakra-ui/react";
import GreetingCard from "./GreetingCard";
import LoginForm from "./LoginForm";

interface Props {}
export const Login: React.FC<Props> = () => {
  return (
    <Flex direction="row" h="100vh" alignContent="center">
      <GreetingCard />
      <LoginForm />
    </Flex>
  );
};
