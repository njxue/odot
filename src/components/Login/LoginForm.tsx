import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  Box,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../contexts/AuthContext";

const LoginForm: React.FC<{}> = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  let auth = useAuth();

  function handleLogin() {
    let email = emailRef.current!.value;
    let password = passwordRef.current!.value;
    auth.login(email, password).then(() => navigate("/"));
  }
  return (
    <Box
      flexGrow="1"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        direction="column"
        minW="200px"
        maxW="300px"
        w="50%"
        alignItems="start"
        gap="100px"
      >
        <VStack w="100%" alignItems="start">
          <Heading>Login</Heading>
          <Divider borderColor="black" />
          <p>lorem ipsum</p>
        </VStack>
        <VStack alignItems="start" w="100%">
          <FormControl>
            <FormLabel>Email: </FormLabel>
            <Input ref={emailRef} type="text" borderColor="gray" />
          </FormControl>
          <FormControl>
            <FormLabel>Password: </FormLabel>
            <Input ref={passwordRef} type="password" borderColor="gray" />
          </FormControl>
          <Button w="100%" colorScheme="teal" onClick={handleLogin}>
            Login
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default LoginForm;
