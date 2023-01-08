import ITask from "../../interface/ITask";
import { Heading, Divider, Center, Box, Flex, HStack } from "@chakra-ui/react";
import TaskList from "../TaskList";
import { NoTasks } from "./NoTasks";

export const TasksBoard: React.FC<{
  tasks: ITask[];
  headerText: string;
  headerLeftElement?: any;
  headerRightElement?: any;
  altText: string;
  altImg: string;
  withLabel?: boolean;
}> = (props) => {
  return (
    <Flex direction="column" h="100%">
      <HStack justifyContent="space-between">
        <HStack>
          {props.headerLeftElement && props.headerLeftElement}
          <Heading>{props.headerText}</Heading>
        </HStack>
        {props.headerRightElement && props.headerRightElement}
      </HStack>

      <Divider marginTop={3} marginBottom={3} borderColor="gray" />
      <Box flexGrow={1} overflow="scroll">
        {props.tasks.length == 0 ? (
          <Center h="100%">
            <NoTasks text={props.altText} img={props.altImg} />
          </Center>
        ) : (
          <TaskList tasks={props.tasks} withLabel />
        )}
      </Box>
    </Flex>
  );
};
