import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../contexts/AuthContext";
import {
  emailErrorCodes,
  passwordErrorCodes,
} from "../../helpers/auth-error-codes";
import PreLoginForm from "../layout/PreLoginForm";
import formStyles from "../../styles/Form.module.css";
import { User } from "firebase/auth";

//======================================== Error messages ========================================
const MESSAGE_PASSWORD_MISSING = "Password is required";
const MESSAGE_EMAIL_MISSING = "Email is required";
const MESSAGE_EMAIL_UNVERIFIED = "Please verify your email before logging in";
//================================================================================================

const LoginForm: React.FC<{}> = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [emailIsInvalid, setEmailIsInvalid] = useState<boolean>(false);
  const [emailIsUnverified, setEmailIsUnverified] = useState<boolean>(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState<boolean>(false);

  const [emailErrorMessage, setEmailErrorMessage] = useState<string>(
    MESSAGE_EMAIL_MISSING
  );
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>(
    MESSAGE_PASSWORD_MISSING
  );

  let auth = useAuth();

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setEmailIsInvalid(false);
    setPasswordIsInvalid(false);

    // Input elements do not exist
    if (emailRef.current == null) {
      setEmailIsInvalid(true);
      setIsLoading(false);
      return;
    }

    if (passwordRef.current === null) {
      setPasswordIsInvalid(true);
      setIsLoading(false);
      return;
    }

    let email = emailRef.current.value.trim();
    let password = passwordRef.current!.value;

    // Empty inputs
    if (email.length === 0) {
      setEmailIsInvalid(true);
      setEmailErrorMessage(MESSAGE_EMAIL_MISSING);
    }

    if (password.length === 0) {
      setPasswordIsInvalid(true);
      setPasswordErrorMessage(MESSAGE_PASSWORD_MISSING);
    }

    if (email.length === 0 || password.length === 0) {
      setIsLoading(false);
      return;
    }

    auth
      .login(email, password)
      .then((cred) => {
        setIsLoading(false);
        const user: User = auth.reloadedCurrUser();
        if (!user.emailVerified) {
          setEmailIsUnverified(true);
          setEmailErrorMessage(MESSAGE_EMAIL_UNVERIFIED);
          auth.logout();
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        const errorCode: string = err.code;
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
    <PreLoginForm header="Login">
      <form onSubmit={(e) => handleLogin(e)} className={formStyles.form}>
        <VStack alignItems="start" w="100%" h="100%" gap={3}>
          <FormControl isInvalid={emailIsInvalid || emailIsUnverified}>
            <FormLabel>Email: </FormLabel>
            <Input ref={emailRef} type="text" borderColor="gray" />
            <FormErrorMessage>{emailErrorMessage}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={passwordIsInvalid}>
            <FormLabel>Password: </FormLabel>
            <Input ref={passwordRef} type="password" borderColor="gray" />
            <FormErrorMessage>{passwordErrorMessage}</FormErrorMessage>
          </FormControl>
          <Button
            w="100%"
            type="submit"
            bgColor="teal"
            color="white"
            isLoading={isLoading}
            _hover={{ filter: "brightness(120%)" }}
          >
            Login
          </Button>
        </VStack>
      </form>
    </PreLoginForm>
  );
};

export default LoginForm;
