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
import { AiOutlineUnorderedList, AiOutlineFieldTime } from "react-icons/ai";
import { MdOutlineCalendarToday } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { TasksBoard } from "./TasksBoard";
import { useWindowDimensions } from "../../helpers/windowDimensions";
import { isAfter, isToday } from "../../helpers/DateTimeCalculations";
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
  const [overdueTasks, setOverdueTasks] = useState<ITask[]>([]);
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
      const tmpOverdue: ITask[] = [];
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

            if (task.dueDate != undefined && !task.isCompleted) {
              if (isToday(new Date(task.dueDate))) {
                tmpToday.push(task);
              } else if (isAfter(new Date(), new Date(task.dueDate))) {
                tmpOverdue.push(task);
              }
            }
          }
        }
      }
      setTodos(tmpTodos);
      setTasks(tmpTasks);
      setImportantTasks(tmpImpt);
      setCompletedTasks(tmpCompleted);
      setTodayTasks(tmpToday);
      setOverdueTasks(tmpOverdue);
      setIsLoading(false);
    });
  }, []);

  const selectedStyles = {
    borderLeft: "solid 10px #05002A",
    fontWeight: "bold",
    bg: "#F2F2F2",
  };

  const tabs = {
    Organised: RiArchiveDrawerFill,
    All: TbListDetails,
    Important: StarIcon,
    Today: MdOutlineCalendarToday,
    Completed: CheckIcon,
    Overdue: AiOutlineFieldTime,
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
            {Object.entries(tabs).map((e) => (
              <Tab w="100%" _selected={selectedStyles}>
                <TabContent icon={e[1]} text={e[0]} />
              </Tab>
            ))}
          </Flex>
          {todos.length > 0 && <Divider borderColor="gray.400" />}
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
        {/* ============================ Tasks organised by list ============================ */}
        <TabPanel h="100%" bg="#F2F2F2">
          <Flex direction="column" h="100%" justifyContent="space-between">
            <VStack align="stretch" overflow="scroll">
              <Heading>Welcome back!</Heading>
              <Divider marginTop={3} borderColor="gray" />
              <Organised todos={todos} />
            </VStack>
            <AddModule />
          </Flex>
        </TabPanel>
        {/* ============================ All Tasks ============================ */}
        <TabPanel h="100%" bgColor="#D2EFED">
          <TasksBoard
            withLabel
            tasks={tasks}
            headerText="All"
            headerLeftElement={<Icon as={tabs.All} boxSize={5} />}
            altText="Wauw you have no tasks! Try adding some from the 'Organised' tab to see them here!"
            altImg="shibaBark.png"
          />
        </TabPanel>
        {/* ============================ Important Tasks ============================ */}
        <TabPanel h="100%" bgColor="#F3DDBF">
          <TasksBoard
            withLabel
            tasks={importantTasks}
            headerText="Important"
            headerLeftElement={<Icon as={tabs.Important} boxSize={5} />}
            altText="You have no important tasks. Try starring some tasks to see them here!"
            altImg="shibaShock.png"
          />
        </TabPanel>
        {/* ============================ Tasks due today ============================ */}
        <TabPanel h="100%" bgColor="#F4DFD1">
          <TasksBoard
            withLabel
            tasks={todayTasks}
            headerText="Today"
            headerLeftElement={<Icon as={tabs.Today} boxSize={5} />}
            altText="You have no tasks due today. Go have fun!"
            altImg="shibaWink.png"
          />
        </TabPanel>
        {/* ============================ Completed Tasks ============================ */}
        <TabPanel h="100%" bgColor="#BFF3C3">
          <TasksBoard
            withLabel
            tasks={completedTasks}
            headerText="Completed"
            headerLeftElement={<Icon as={tabs.Completed} boxSize={5} />}
            altText="You have not completed any tasks!"
            altImg="shibaSad.png"
          />
        </TabPanel>
        {/* ============================ Overdue-d Tasks ============================ */}
        <TabPanel h="100%" bgColor="#F9C0C0">
          <TasksBoard
            withLabel
            tasks={overdueTasks}
            headerText="Overdue"
            headerLeftElement={<Icon as={tabs.Overdue} boxSize={5} />}
            altText="Yay! You have no overdue-d tasks!"
            altImg="amazed.png"
          />
        </TabPanel>
        {/* ============================ Created lists ============================ */}
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
              headerRightElement={<Settings todoId={t.id} todoName={t.name} />}
              altText={`No tasks left for ${t.name}!`}
              altImg="amazed.png"
            />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
