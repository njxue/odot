import { Text, Switch, Button, useColorMode, Icon } from "@chakra-ui/react";
import { CiBrightnessDown, CiDark } from "react-icons/ci";

export const ToggleTheme: React.FC<{}> = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      w="200px"
      onClick={toggleColorMode}
      leftIcon={<Icon as={colorMode === "light" ? CiDark : CiBrightnessDown} />}
      borderColor="gray.400"
      borderWidth={1}
      variant="outline"
    >
      {colorMode === "light" ? "Light" : "Dark"} theme
    </Button>
  );
};
