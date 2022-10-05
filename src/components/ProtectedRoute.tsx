import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../contexts/AuthContext";
import { Banner } from "./Banner";
import Loader from "./layout/Loader";
import { Login } from "./Login";

export const ProtectedRoute: React.FC<{}> = () => {
  let isLoggedIn: boolean | undefined = useAuth().isLoggedIn;

  if (isLoggedIn == undefined) {
    return <Loader />;
  }

  if (!isLoggedIn) {
    return <Login />; // why navigate("/login") does not work?
  }

  return (
    <Banner>
      <Outlet />
    </Banner>
  );
};
