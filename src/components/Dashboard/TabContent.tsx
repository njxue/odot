import { Flex, Icon, Text } from "@chakra-ui/react";

export const TabContent: React.FC<{ icon: any; text: string }> = (
  props
) => {
  return (
    <Flex alignItems="center" justifyContent="start" w="100%" gap="10px">
      <Icon as={props.icon} />
      <Text>{props.text}</Text>
    </Flex>
  );
};
