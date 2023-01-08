import { AddModule } from "./AddModule";
import ITask from "../../interface/ITask";
import { Organised } from "./Organised";
import {
  TabPanels,
  TabPanel,
  Heading,
  Divider,
  Icon,
  Flex,
  VStack,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { TasksBoard } from "./TasksBoard";
import { isAfter, isToday } from "../../helpers/date-time-calculations";
import { TodoSettings } from "../TodoSettings";
import { ClearAllTasks } from "../TaskList/ClearAllTasks";
import ITodo from "../../interface/ITodo";
import { NoTasks } from "./NoTasks";

export const TabWindows: React.FC<{
  tasks: ITask[];
  todos: ITodo[];
  keywords: string;
  tabs: { [key: string]: { icon: any; color: string } };
}> = (props) => {
  const { tasks, todos, keywords, tabs } = props;

  // ================================ Filtered list of tasks ==============================================
  const predicateImportant: (task: ITask) => boolean = (task: ITask) =>
    !task.isCompleted && task.isImportant;
  const predicateCompleted: (task: ITask) => boolean = (task: ITask) =>
    task.isCompleted;
  const predicateIncomplete: (task: ITask) => boolean = (task: ITask) =>
    !task.isCompleted;
  const predicateToday: (task: ITask) => boolean = (task: ITask) =>
    !task.isCompleted &&
    task.dueDate != null &&
    isToday(new Date(task.dueDate));
  const predicateOverdue: (task: ITask) => boolean = (task: ITask) =>
    !task.isCompleted &&
    task.dueDate != null &&
    isAfter(new Date(), new Date(task.dueDate));
  const predicateSubstring: (task: ITask) => boolean = (task: ITask) =>
    task.name.toLowerCase().includes(keywords.toLowerCase());
  // =======================================================================================================

  const bgSearchedLists = useColorModeValue("#E3E9FB", "#415F5F");
  const bgCreatedLists = useColorModeValue("#D2EFED", "#415F5F");

  return (
    <TabPanels flexGrow={10} h="100%" overflow="hidden">
      {/* ============================ Searched lists ============================ */}
      <TabPanel h="100%" bgColor={bgSearchedLists}>
        <TasksBoard
          withLabel
          tasks={tasks.filter(predicateSubstring)}
          headerText="Search"
          headerLeftElement={<Icon as={SearchIcon} boxSize={5} />}
          altText="No tasks found"
          altImg="shibaCry.png"
        />
      </TabPanel>
      {/* ============================ Tasks organised by list ============================ */}
      <TabPanel h="100%" bgColor={tabs.Organised.color}>
        <Flex direction="column" h="100%" justifyContent="space-between">
          <VStack align="stretch" overflow="auto" h="100%">
            <Heading>Welcome back!</Heading>
            <Divider marginTop={3} borderColor="gray" />
            {todos.length > 0 ? (
              <Organised todos={todos} />
            ) : (
              <Center h="100%">
                <NoTasks text="Wow, such empty" img="shibaCalm.png" />
              </Center>
            )}
          </VStack>
          <AddModule />
        </Flex>
      </TabPanel>
      {/* ============================ All Tasks ============================ */}
      <TabPanel h="100%" bgColor={tabs.All.color}>
        <TasksBoard
          withLabel
          tasks={tasks.filter(predicateIncomplete)}
          headerText="All"
          headerLeftElement={<Icon as={tabs.All.icon} boxSize={5} />}
          altText="Wauw you have no tasks! Try adding some from the 'Organised' tab to see them here!"
          altImg="shibaBark.png"
        />
      </TabPanel>
      {/* ============================ Important Tasks ============================ */}
      <TabPanel h="100%" bgColor={tabs.Important.color}>
        <TasksBoard
          withLabel
          tasks={tasks.filter(predicateImportant)}
          headerText="Important"
          headerLeftElement={<Icon as={tabs.Important.icon} boxSize={5} />}
          altText="You have no important tasks. Try starring some tasks to see them here!"
          altImg="shibaShock.png"
        />
      </TabPanel>
      {/* ============================ Tasks due today ============================ */}
      <TabPanel h="100%" bgColor={tabs.Today.color}>
        <TasksBoard
          withLabel
          tasks={tasks.filter(predicateToday)}
          headerText="Today"
          headerLeftElement={<Icon as={tabs.Today.icon} boxSize={5} />}
          altText="You have no tasks due today. Go have fun!"
          altImg="shibaWink.png"
        />
      </TabPanel>
      {/* ============================ Completed Tasks ============================ */}
      <TabPanel h="100%" bgColor={tabs.Completed.color}>
        <TasksBoard
          withLabel
          tasks={tasks.filter(predicateCompleted)}
          headerText="Completed"
          headerLeftElement={<Icon as={tabs.Completed.icon} boxSize={5} />}
          headerRightElement={
            <ClearAllTasks tasks={tasks.filter(predicateCompleted)} />
          }
          altText="You have not completed any tasks!"
          altImg="shibaSad.png"
        />
      </TabPanel>
      {/* ============================ Overdue-d Tasks ============================ */}
      <TabPanel h="100%" bgColor={tabs.Overdue.color}>
        <TasksBoard
          withLabel
          tasks={tasks.filter(predicateOverdue)}
          headerText="Overdue"
          headerLeftElement={<Icon as={tabs.Overdue.icon} boxSize={5} />}
          altText="Yay! You have no overdue-d tasks!"
          altImg="shibaAmazed.png"
        />
      </TabPanel>
      {/* ============================ Created lists ============================ */}
      {todos.map((t) => (
        <TabPanel h="100%" bgColor={bgCreatedLists} key={t.id}>
          <TasksBoard
            tasks={
              t.tasks == undefined
                ? []
                : Object.entries(t.tasks)
                    .map((t) => t[1])
                    .filter((t) => !t.isCompleted)
            }
            headerText={t.name}
            headerRightElement={
              <TodoSettings todoId={t.id} todoName={t.name} />
            }
            altText={`No tasks left for ${t.name}!`}
            altImg="shibaHappy.png"
          />
        </TabPanel>
      ))}
    </TabPanels>
  );
};
