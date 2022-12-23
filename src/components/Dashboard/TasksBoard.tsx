import ITask from "../../interface/ITask";
import {
  Heading,
  Divider,
  Center,
  Box,
  Flex,
  HStack,
  Icon,
} from "@chakra-ui/react";
import TaskList from "../TaskList";
import { NoTasks } from "./NoTasks";

export const TasksBoard: React.FC<{
  tasks: ITask[];
  headerText: string;
  headerIcon?: any;
  placeholder: string;
}> = (props) => {
  return (
    <Flex direction="column" maxH="100%">
      <HStack>
        {props.headerIcon && <Icon as={props.headerIcon} boxSize={5} />}
        <Heading>{props.headerText}</Heading>
      </HStack>

      <Divider marginTop={3} marginBottom={3} borderColor="gray" />
      <Box flexGrow={1} overflow="scroll">
        {props.tasks.length == 0 ? (
          <Center h="100%">
            <NoTasks text={props.placeholder} />
          </Center>
        ) : (
          <TaskList tasks={props.tasks} />
        )}
      </Box>
    </Flex>
  );
};
