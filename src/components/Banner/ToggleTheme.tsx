import { Text, Switch, Button, useColorMode } from "@chakra-ui/react";

export const ToggleTheme: React.FC<{}> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return <Button onClick={toggleColorMode}>Change theme</Button>;
};
