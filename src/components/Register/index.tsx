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
        bgColor="#d83c8c"
        buttonColor="teal"
      />
      <RegisterForm />
    </PreLoginLayout>
  );
};
