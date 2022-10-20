import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PreLoginLayout from "../layout/PreLoginLayout";
import GreetingCard from "./GreetingCard";
import LoginForm from "./LoginForm";

export const Login: React.FC<{}> = () => {
  const navigate = useNavigate();
  const greetingComponent: React.ReactNode = (
    <GreetingCard
      header="Sign up now"
      text="You won't forget shit"
      onClickButtonEvent={() => navigate("/register")}
      buttonText="Register"
    />
  );
  return (
    <PreLoginLayout
      greetingComponent={greetingComponent}
      formComponent={<LoginForm />}
    />
  );
};
