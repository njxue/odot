import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../contexts/AuthContext";
import { Banner } from "./Banner";
import { Login } from "./Login";

export const ProtectedRoute: React.FC<{}> = () => {
  let isLoggedIn: boolean | undefined = useAuth().isLoggedIn;
  const navigate = useNavigate();
 

  if (isLoggedIn == undefined) {
    return <div>loading......</div>;
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
