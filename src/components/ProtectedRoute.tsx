import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../contexts/AuthContext";
import { Banner } from "./Banner";
import Loader from "./layout/Loader";
import { Login } from "./Login";
import { Box, Flex, VStack } from "@chakra-ui/react";

export const ProtectedRoute: React.FC<{}> = () => {
  let isLoggedIn: boolean | undefined = useAuth().isLoggedIn;

  if (isLoggedIn == undefined) {
    return <Loader />;
  }

  if (!isLoggedIn) {
    return <Login />; // why navigate("/login") does not work?
  }

  return (
    <Flex direction="column" w="100vw" h="100vh">
      <Box>
        <Banner />
      </Box>
      <Box flexGrow={1} overflow="hidden">
        <Outlet />
      </Box>
    </Flex>
  );
};
