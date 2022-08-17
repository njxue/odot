import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";

interface Props {}
export const Login: React.FC<Props> = () => {
  return (
    <VStack>
      <Heading>Login</Heading>
      <FormControl>
        <FormLabel>Email: </FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Password: </FormLabel>
        <Input type="password" />
      </FormControl>
    </VStack>
  );
};
