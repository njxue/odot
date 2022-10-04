import { useNavigate } from "react-router-dom";
import PreLoginLayout from "../layout/PreLoginLayout";
import GreetingCard from "../Login/GreetingCard";
import RegisterForm from "./RegisterForm";

export const Register: React.FC<{}> = () => {
  const navigate = useNavigate();
  return (
    <PreLoginLayout>
      <GreetingCard
        header="Login"
        text="lorem ipsum"
        onClickButtonEvent={() => navigate("/")}
        buttonText="Login"
        bgColor="pink.700"
        buttonColor="teal"
      />
      <RegisterForm />
    </PreLoginLayout>
  );
};
