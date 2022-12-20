import ITask from "../../interface/ITask";
import { Heading, Divider, Center } from "@chakra-ui/react";
import TaskList from "../TaskList";
import { NoTasks } from "./NoTasks";

export const TasksBoard: React.FC<{
  tasks: ITask[];
  header: string;
  placeholder: string;
}> = (props) => {
  return (
    <>
      <Heading>{props.header}</Heading>
      <Divider marginTop={3} marginBottom={3} borderColor="gray" />
      {props.tasks.length == 0 ? (
        <Center h="100%">
          <NoTasks text={props.placeholder} />
        </Center>
      ) : (
        <TaskList tasks={props.tasks} />
      )}
    </>
  );
};
