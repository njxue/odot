import {
    FormControl,
    FormLabel,
    Heading,
    Input,
    VStack,
  } from "@chakra-ui/react";
  
  interface Props {}
  export const Register: React.FC<Props> = () => {
    return (
      <VStack>
        <Heading>Register</Heading>
        <FormControl>
          <FormLabel>Email: </FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl>
          <FormLabel>Password: </FormLabel>
          <Input type="password" />
        </FormControl>
        <FormControl>
          <FormLabel>Confirm Password: </FormLabel>
          <Input type="password" />
        </FormControl>
      </VStack>
    );
  };
  