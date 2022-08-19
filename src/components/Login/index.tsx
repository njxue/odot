import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import useAuth from "../../contexts/AuthContext";

interface Props {}
export const Login: React.FC<Props> = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  
  let auth = useAuth();
  

  function handleLogin() {
    let email = emailRef.current!.value;
    let password = passwordRef.current!.value;
    auth?.login(email, password);
  }


  return (
    <VStack>
      <Heading>Login</Heading>
      <FormControl>
        <FormLabel>Email: </FormLabel>
        <Input ref={emailRef} type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Password: </FormLabel>
        <Input ref={passwordRef} type="password" />
      </FormControl>
      <Button onClick={handleLogin}>Login</Button>
    </VStack>
  );
};
