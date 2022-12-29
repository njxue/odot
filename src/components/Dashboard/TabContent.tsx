import { Flex, Icon, Text } from "@chakra-ui/react";

export const TabContent: React.FC<{ icon?: any; text: string }> = (props) => {
  return (
    <Flex alignItems="center" justifyContent="start" w="100%" zgap="10px">
      {props.icon && <Icon as={props.icon} />}
      <Text textAlign="start">
        {props.text}
      </Text>
    </Flex>
  );
};
