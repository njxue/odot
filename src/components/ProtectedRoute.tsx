import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../contexts/AuthContext";
import { Banner } from "./Banner";
import Loader from "./layout/Loader";
import { Login } from "./Login";
import { Box, VStack } from "@chakra-ui/react";

export const ProtectedRoute: React.FC<{}> = () => {
  let isLoggedIn: boolean | undefined = useAuth().isLoggedIn;

  if (isLoggedIn == undefined) {
    return <Loader />;
  }

  if (!isLoggedIn) {
    return <Login />; // why navigate("/login") does not work?
  }

  return (
    <Box margin={0} padding={0} maxW="100vw" h="100vh">
      <VStack align="stretch" h="100%" spacing={0}>
        <Banner />
        <Outlet />
      </VStack>
    </Box>
  );
};
