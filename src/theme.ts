import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    Button: {
      baseStyle: (props: any) => ({}),
    },

    FormLabel: {
      baseStyle: {
        color: "black",
      },
    },
    FormErrorMessage: {
      baseStyle: {
        color: "red",
      },
    },
    Input: {
      baseStyle: {
        color: "black",
      },
    },
  },
});

export default theme;
