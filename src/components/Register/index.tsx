import { useNavigate } from "react-router-dom";
import PreLoginLayout from "../layout/PreLoginLayout";
import GreetingCard from "../Login/GreetingCard";
import RegisterForm from "./RegisterForm";

export const Register: React.FC<{}> = () => {
  const navigate = useNavigate();
  return (
    <PreLoginLayout>
      <GreetingCard
        header="See what shit you've left undone"
        onClickButtonEvent={() => navigate("/")}
        buttonText="Login"
        bgColor="pink.700"
        buttonColor="teal"
      />
      <RegisterForm />
    </PreLoginLayout>
  );
};
