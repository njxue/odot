import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useRef } from "react";
import useAuth from "../../contexts/AuthContext";

interface Props {}
export const Register: React.FC<Props> = () => {
  let auth = useAuth();
  let currUser: User;
  let register: (
    email: string,
    password: string,
    username: string
  ) => Promise<any>;

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCfRef = useRef<HTMLInputElement>(null);

  if (auth) {
    if (auth.currUser) {
      currUser = auth.currUser;
    }
    register = auth.register;
    
  }

  function handleRegister() {
    // TODO: enforce all input fields are filled
    const email: string = emailRef.current!.value;
    const password: string = passwordRef.current!.value;
    const passwordcf: string = passwordCfRef.current!.value;
    register(email, password, passwordcf);
  }

  return (
    <VStack>
      <Heading>Register</Heading>
      <FormControl>
        <FormLabel>Email: </FormLabel>
        <Input ref={emailRef} type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Password: </FormLabel>
        <Input ref={passwordRef} type="password" />
      </FormControl>
      <FormControl>
        <FormLabel>Confirm Password: </FormLabel>
        <Input ref={passwordCfRef} type="password" />
      </FormControl>
      <Button onClick={handleRegister}>Register</Button>
    </VStack>
  );
};
