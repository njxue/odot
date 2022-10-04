import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useRef } from "react";
import useAuth from "../../contexts/AuthContext";
import PreLoginForm from "../layout/PreLoginForm";

const RegisterForm: React.FC<{}> = () => {
  let register: (
    email: string,
    password: string,
    username: string
  ) => Promise<any>;

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCfRef = useRef<HTMLInputElement>(null);

  register = useAuth().register;

  function handleRegister() {
    // TODO: enforce all input fields are filled
    const email: string = emailRef.current!.value;
    const password: string = passwordRef.current!.value;
    const passwordcf: string = passwordCfRef.current!.value;
    register(email, password, passwordcf);
  }
  return (
    <PreLoginForm header="Register" text="lorem ipsum">
      <FormControl>
        <FormLabel>Email: </FormLabel>
        <Input ref={emailRef} type="text" borderColor="gray" />
      </FormControl>
      <FormControl>
        <FormLabel>Password: </FormLabel>
        <Input ref={passwordRef} type="password" borderColor="gray" />
      </FormControl>
      <FormControl>
        <FormLabel>Confirm Password: </FormLabel>
        <Input ref={passwordCfRef} type="password" borderColor="gray" />
      </FormControl>
      <Button onClick={handleRegister} colorScheme="pink" w="100%">
        Register
      </Button>
    </PreLoginForm>
  );
};

export default RegisterForm;
