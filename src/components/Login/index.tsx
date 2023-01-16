import { Navigate, useNavigate } from "react-router-dom";
import PreLoginLayout from "../layout/PreLoginLayout";
import GreetingCard from "./GreetingCard";
import LoginForm from "./LoginForm";
import useAuth from "../../contexts/AuthContext";
import Loader from "../layout/Loader";

export const Login: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  if (isLoggedIn === undefined) {
    return <Loader />;
  }

  const greetingComponent: React.ReactNode = (
    <GreetingCard
      text="Do not have an account?"
      onClickButtonEvent={() => navigate("/register")}
      buttonText="Register"
    />
  );
  return isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <PreLoginLayout
      greetingComponent={greetingComponent}
      formComponent={<LoginForm />}
    />
  );
};
