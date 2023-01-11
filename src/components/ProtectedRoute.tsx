import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../contexts/AuthContext";
import { Banner } from "./Banner";
import Loader from "./layout/Loader";
import { Login } from "./Login";
import { Box, Flex, VStack } from "@chakra-ui/react";
import { UserPrefsProvider } from "../contexts/UserPrefs";

export const ProtectedRoute: React.FC<{}> = () => {
  let isLoggedIn: boolean | undefined = useAuth().isLoggedIn;
  const navigate = useNavigate();
  // checking login status
  if (isLoggedIn == undefined) {
    return <Loader />;
  }

  // login status checked. Check if logged in

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <Flex direction="column" w="100vw" h="100vh">
      <UserPrefsProvider>
        <Banner />
        <Box flexGrow={1} overflow="auto">
          <Outlet />
        </Box>
      </UserPrefsProvider>
    </Flex>
  );
};
