import { VStack, Image, Text } from "@chakra-ui/react";

export const NoTasks: React.FC<{
  text: string;
  img?: string;
}> = (props) => {
  const { text, img } = props;

  return (
    <VStack w="100%">
      {img && (
        <Image
          src={require(`../../assets/${img}`)}
          boxSize={20}
          pointerEvents="none"
        />
      )}
      <Text maxW="80%" textAlign="center" fontSize="md">
        {text}
      </Text>
    </VStack>
  );
};
