import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const components = {
  FormLabel: {
    baseStyle: {
      color: "black",
    },
  },
  Input: {
    baseStyle: (props: any) => ({
      field: {
        color: mode("black", "whiteAlpha.900")(props),
        _autofill: {
          border: "1px solid gray.200",
          textFillColor: "black",
          boxShadow: "0 0 0px 1000px white inset",
          transition: "background-color 5000s ease-in-out 0s",
        },
      },
    }),
  },
};

const styles = {
  global: (props: any) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("white", "#00282A")(props),
    },
    input: {
      bg: mode("whiteAlpha.900", "transparent")(props),
    },
  }),
};

const theme = extendTheme({
  config,
  components,
  styles,
});

export default theme;
