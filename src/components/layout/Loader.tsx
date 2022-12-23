import { Box, Center, Image } from "@chakra-ui/react";

const Loader: React.FC<{}> = () => {
  return (
    <Center
      position="fixed"
      top={0}
      left={0}
      w="100%"
      h="100%"
      padding={0}
      margin={0}
      bg="#00494c"
      zIndex={2147483647}
    >
      <Box w="30%" h="30%">
        <Image
          src={require("../../assets/logo.png")}
          boxSize="100%"
          objectFit="contain"
        />
      </Box>
    </Center>
  );
};

export default Loader;
