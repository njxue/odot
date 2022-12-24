import { useNavigate } from "react-router-dom";
import PreLoginLayout from "../layout/PreLoginLayout";
import GreetingCard from "../Login/GreetingCard";
import RegisterForm from "./RegisterForm";

export const Register: React.FC<{}> = () => {
  const navigate = useNavigate();
  const greetingComponent: React.ReactNode = (
    <GreetingCard
      text="Already have an account?"
      onClickButtonEvent={() => navigate("/")}
      buttonText="Login"
    />
  );
  return (
    <PreLoginLayout
      greetingComponent={greetingComponent}
      formComponent={<RegisterForm />}
    />
  );
};
