import { Text, Switch, Button, useColorMode, Icon } from "@chakra-ui/react";
import { CiBrightnessDown, CiDark } from "react-icons/ci";

export const ToggleTheme: React.FC<{}> = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      w="150px"
      onClick={toggleColorMode}
      leftIcon={<Icon as={colorMode === "light" ? CiDark : CiBrightnessDown} />}
    >
      {colorMode === "light" ? "Dark" : "Light"} theme
    </Button>
  );
};
