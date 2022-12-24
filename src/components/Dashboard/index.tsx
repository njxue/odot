import { AddModule } from "./AddModule";
import { ref, onValue } from "firebase/database";
import { db } from "../../config/firebase";
import useAuth from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import Todo from "../../interface/Todo";
import ITask from "../../interface/ITask";
import Loader from "../layout/Loader";
import { Organised } from "./Organised";
import {
  TabList,
  Tab,
  Tabs,
  TabPanels,
  TabPanel,
  Heading,
  Divider,
  Icon,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { RiArchiveDrawerFill } from "react-icons/ri";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { MdOutlineCalendarToday } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { TasksBoard } from "./TasksBoard";
import { useWindowDimensions } from "../../helpers/windowDimensions";
import { isToday } from "../../helpers/DateTimeCalculations";
import { TabContent } from "./TabContent";
import { CheckIcon, StarIcon } from "@chakra-ui/icons";
import { Settings } from "../Todo/Settings";

export const Dashboard: React.FC<{}> = () => {
  const currUser: User = useAuth().getCurrUser();
  const todosRef = ref(db, `users/${currUser.uid}/todos`);

  const [todos, setTodos] = useState<Todo[]>([]);

  // ================================ Filtered list of tasks ==============================================
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [importantTasks, setImportantTasks] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);
  const [todayTasks, setTodayTasks] = useState<ITask[]>([]);
  // =======================================================================================================

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const w = useWindowDimensions().width;

  useEffect(() => {
    onValue(todosRef, (snapshot) => {
      const tmpTodos: Todo[] = [];
      const tmpTasks: ITask[] = [];
      const tmpImpt: ITask[] = [];
      const tmpCompleted: ITask[] = [];
      const tmpToday: ITask[] = [];
      const data = snapshot.val();
      for (const todoId in data) {
        const name: string = data[todoId].name;
        const tasks = data[todoId].tasks;

        const todo: Todo = {
          id: todoId,
          name: name,
          tasks: data[todoId].tasks,
        };

        tmpTodos.push(todo);
        if (tasks != undefined) {
          for (const taskId in tasks) {
            const task: ITask = tasks[taskId];

            if (task.isImportant && !task.isCompleted) {
              tmpImpt.push(task);
            }

            if (task.isCompleted) {
              tmpCompleted.push(task);
            } else {
              tmpTasks.push(task);
            }

            if (
              task.dueDate != undefined &&
              isToday(new Date(task.dueDate)) &&
              !task.isCompleted
            ) {
              tmpToday.push(task);
            }
          }
        }
      }
      setTodos(tmpTodos);
      setTasks(tmpTasks);
      setImportantTasks(tmpImpt);
      setCompletedTasks(tmpCompleted);
      setTodayTasks(tmpToday);
      setIsLoading(false);
    });
  }, []);

  const selectedStyles = {
    borderLeft: "solid 10px #05002A",
    fontWeight: "bold",
    bg: "#F2F2F2",
  };
  return isLoading ? (
    <Loader />
  ) : (
    <Tabs
      orientation={w < 500 ? "horizontal" : "vertical"}
      w="100%"
      display="flex"
      flexDir={w < 500 ? "column" : "row"}
      h="100%"
    >
      <TabList w="100%" paddingTop={3} flexBasis={0} minW="200px">
        <Flex
          w="100%"
          direction="column"
          justifyContent="space-between"
          padding="2px"
          h="100%"
        >
          <Flex
            direction={w < 500 ? "row" : "column"}
            flexGrow={1}
            overflow="scroll"
          >
            <Tab w="100%" _selected={selectedStyles}>
              <TabContent icon={RiArchiveDrawerFill} text="Organised" />
            </Tab>
            <Tab w="100%" _selected={selectedStyles}>
              <TabContent icon={TbListDetails} text="All" />
            </Tab>
            <Tab w="100%" _selected={selectedStyles}>
              <TabContent icon={StarIcon} text="Important" />
            </Tab>
            <Tab w="100%" _selected={selectedStyles}>
              <TabContent icon={MdOutlineCalendarToday} text="Today" />
            </Tab>
            <Tab w="100%" _selected={selectedStyles}>
              <TabContent icon={CheckIcon} text="Completed" />
            </Tab>
          </Flex>
          <Divider borderColor="blackAlpha.700" />
          <Flex
            direction={w < 500 ? "row" : "column"}
            marginTop="20px"
            overflow="scroll"
            flexGrow={3}
            flexBasis="50%"
            padding={0}
          >
            {todos.map((t) => (
              <Tab w="100%" _selected={selectedStyles}>
                <TabContent icon={AiOutlineUnorderedList} text={t.name} />
              </Tab>
            ))}
          </Flex>
        </Flex>
      </TabList>
      <TabPanels flexGrow={1} h="100%" overflow="hidden">
        <TabPanel h="100%">
          <Flex direction="column" h="100%" justifyContent="space-between">
            <VStack align="stretch" overflow="scroll">
              <Heading>Welcome back!</Heading>
              <Divider marginTop={3} borderColor="gray" />
              <Organised todos={todos} />
            </VStack>
            <AddModule />
          </Flex>
        </TabPanel>
        <TabPanel h="100%" bgColor="#D2EFED">
          <TasksBoard
            tasks={tasks}
            headerText="All"
            headerLeftElement={<Icon as={TbListDetails} boxSize={5} />}
            placeholder="Add tasks!"
          />
        </TabPanel>
        <TabPanel h="100%" bgColor="#F3DDBF">
          <TasksBoard
            tasks={importantTasks}
            headerText="Important"
            headerLeftElement={<Icon as={StarIcon} boxSize={5} />}
            placeholder="Try starring some tasks to see them here!"
          />
        </TabPanel>
        <TabPanel h="100%" bgColor="#F4DFD1">
          <TasksBoard
            tasks={todayTasks}
            headerText="Today"
            headerLeftElement={<Icon as={MdOutlineCalendarToday} boxSize={5} />}
            placeholder="Tasks that are due today show up here!"
          />
        </TabPanel>
        <TabPanel h="100%" bgColor="#BFF3C3">
          <TasksBoard
            tasks={completedTasks}
            headerText="Completed"
            headerLeftElement={<Icon as={CheckIcon} boxSize={5} />}
            placeholder="Try to complete some tasks to see them here!"
          />
        </TabPanel>
        {todos.map((t) => (
          <TabPanel h="100%" bgColor="#D2EFED">
            <TasksBoard
              tasks={
                t.tasks == undefined
                  ? []
                  : Object.entries(t.tasks)
                      .map((t) => t[1])
                      .filter((t) => !t.isCompleted)
              }
              headerText={t.name}
              headerRightElement={<Settings todoId={t.id} />}
              placeholder="Try to complete some tasks to see them here!"
            />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
