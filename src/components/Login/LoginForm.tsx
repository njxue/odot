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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../contexts/AuthContext";
import {
  emailErrorCodes,
  passwordErrorCodes,
} from "../../helpers/authErrorCodes";
import PreLoginForm from "../layout/PreLoginForm";

const MESSAGE_PASSWORD_MISSING = "Password is required";
const MESSAGE_EMAIL_MISSING = "Email is required";

const LoginForm: React.FC<{}> = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [emailIsInvalid, setEmailIsInvalid] = useState<boolean>(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState<boolean>(false);

  const [emailErrorMessage, setEmailErrorMessage] = useState<string>(
    MESSAGE_EMAIL_MISSING
  );
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>(
    MESSAGE_PASSWORD_MISSING
  );

  let auth = useAuth();

  function handleLogin() {
    setEmailIsInvalid(false);
    setPasswordIsInvalid(false);

    if (emailRef.current == null) {
      setEmailIsInvalid(true);
      return;
    }

    if (passwordRef.current == null) {
      setPasswordIsInvalid(true);
      return;
    }

    let email = emailRef.current.value.trim();
    let password = passwordRef.current!.value;

    if (email.length == 0) {
      setEmailIsInvalid(true);
      setEmailErrorMessage(MESSAGE_EMAIL_MISSING);
      return;
    }

    if (password.length == 0) {
      setPasswordIsInvalid(true);
      setPasswordErrorMessage(MESSAGE_PASSWORD_MISSING);
      return;
    }

    auth
      .login(email, password)
      .then(() => navigate("/"))
      .catch((err) => {
        const errorCode: string = err.code;
        console.log(errorCode);
        if (emailErrorCodes[errorCode]) {
          setEmailIsInvalid(true);
          setEmailErrorMessage(emailErrorCodes[errorCode]);
        } else if (passwordErrorCodes[errorCode]) {
          setPasswordIsInvalid(true);
          setPasswordErrorMessage(passwordErrorCodes[errorCode]);
        }
      });
  }

  return (
    <PreLoginForm header="Login" text="lorem ipsum">
      <VStack alignItems="start" w="100%">
        <FormControl isInvalid={emailIsInvalid}>
          <FormLabel>Email: </FormLabel>
          <Input ref={emailRef} type="text" borderColor="gray" />
          <FormErrorMessage>{emailErrorMessage}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={passwordIsInvalid}>
          <FormLabel>Password: </FormLabel>
          <Input ref={passwordRef} type="password" borderColor="gray" />
          <FormErrorMessage>{passwordErrorMessage}</FormErrorMessage>
        </FormControl>
        <Button w="100%" colorScheme="teal" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
    </PreLoginForm>
  );
};

export default LoginForm;
