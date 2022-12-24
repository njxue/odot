import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import useAuth from "../../contexts/AuthContext";
import PreLoginForm from "../layout/PreLoginForm";
import {
  emailErrorCodes,
  passwordErrorCodes,
} from "../../helpers/authErrorCodes";
import formStyles from "../../styles/Form.module.css";
import { sendEmailVerification } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";

const MESSAGE_PASSWORD_MISSING = "Password is required";
const MESSAGE_PASSWORD_CF_MISSING = "Confirm your password";
const MESSAGE_PASSWORD_TOO_SHORT =
  "Password needs to be at least 6 characters long";
const MESSAGE_PASSWORD_MISMATCH = "Passwords do not match";
const MESSAGE_EMAIL_MISSING = "Email is required";

const RegisterForm: React.FC<{}> = () => {
  let auth = useAuth();
  const navigate = useNavigate();

  // Input elements
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordCfRef = useRef<HTMLInputElement>(null);

  // Validity checks
  const [emailIsInvalid, setEmailIsInvalid] = useState<boolean>(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState<boolean>(false);
  const [passwordCfIsInvalid, setPasswordCfIsInvalid] =
    useState<boolean>(false);

  // Error messages
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>(
    MESSAGE_EMAIL_MISSING
  );
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>(
    MESSAGE_PASSWORD_MISSING
  );
  const [passwordCfErrorMessage, setPasswordCfErrorMessage] = useState<string>(
    MESSAGE_PASSWORD_MISSING
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleRegister(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    setEmailIsInvalid(false);
    setPasswordIsInvalid(false);
    setPasswordCfIsInvalid(false);
    setIsLoading(true);

    // Input elements do not exist
    if (emailRef.current == null) {
      setEmailIsInvalid(true);
      setIsLoading(false);
      return;
    }

    if (passwordRef.current == null) {
      setPasswordIsInvalid(true);
      setIsLoading(false);
      return;
    }

    if (passwordCfRef.current == null) {
      setPasswordCfIsInvalid(true);
      setIsLoading(false);
      return;
    }

    const email: string = emailRef.current.value.trim();
    const password: string = passwordRef.current.value;
    const passwordcf: string = passwordCfRef.current.value;

    // Empty inputs
    if (email.length == 0) {
      setEmailIsInvalid(true);
      setEmailErrorMessage(MESSAGE_EMAIL_MISSING);
      setIsLoading(false);
    }

    if (password.length == 0) {
      setPasswordIsInvalid(true);
      setPasswordErrorMessage(MESSAGE_PASSWORD_MISSING);
      setIsLoading(false);
    }

    if (passwordcf.length == 0) {
      setPasswordCfIsInvalid(true);
      setPasswordCfErrorMessage(MESSAGE_PASSWORD_CF_MISSING);
      setIsLoading(false);
    }

    if (email.length == 0 || password.length == 0 || passwordcf.length == 0) {
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setPasswordIsInvalid(true);
      setPasswordErrorMessage(MESSAGE_PASSWORD_TOO_SHORT);
      setIsLoading(false);
      return;
    }

    if (passwordcf != password) {
      setPasswordCfIsInvalid(true);
      setPasswordCfErrorMessage(MESSAGE_PASSWORD_MISMATCH);
      setIsLoading(false);
      return;
    }

    auth
      .register(email, password)
      .then(() => {
        setIsLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        setIsLoading(false);
        const errorCode: string = err.code;
        console.log(err);
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
    <PreLoginForm header="Register">
      <form onSubmit={(e) => handleRegister(e)} className={formStyles.form}>
        <VStack alignItems="start" w="100%" h="100%" gap={3}>
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
          <FormControl isInvalid={passwordCfIsInvalid}>
            <FormLabel>Confirm Password: </FormLabel>
            <Input ref={passwordCfRef} type="password" borderColor="gray" />
            <FormErrorMessage>{passwordCfErrorMessage}</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            color="white"
            bgColor="teal"
            _hover={{ bgColor: "teal.500" }}
            w="100%"
            isLoading={isLoading}
          >
            Register
          </Button>
        </VStack>
      </form>
    </PreLoginForm>
  );
};

export default RegisterForm;
