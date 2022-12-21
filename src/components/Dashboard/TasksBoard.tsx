import ITask from "../../interface/ITask";
import { Heading, Divider, Center, Box, Flex } from "@chakra-ui/react";
import TaskList from "../TaskList";
import { NoTasks } from "./NoTasks";

export const TasksBoard: React.FC<{
  tasks: ITask[];
  header: string;
  placeholder: string;
}> = (props) => {
  return (
    <Flex direction="column" maxH="100%">
      <Heading>{props.header}</Heading>
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
