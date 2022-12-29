import { AddModule } from "./AddModule";
import { ref, onValue } from "firebase/database";
import { db } from "../../config/firebase";
import useAuth from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import Todo from "../../interface/ITodo";
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
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { RiArchiveDrawerFill } from "react-icons/ri";
import { AiOutlineUnorderedList, AiOutlineFieldTime } from "react-icons/ai";
import { MdOutlineCalendarToday } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { TasksBoard } from "./TasksBoard";
import { useWindowDimensions } from "../../helpers/useWindowDimensions";
import { isAfter, isToday } from "../../helpers/date-time-calculations";
import { TabContent } from "./TabContent";
import { CheckIcon, StarIcon } from "@chakra-ui/icons";
import { Settings } from "../Todo/Settings";
import { ClearAllTasks } from "../TaskList/ClearAllTasks";

export const Dashboard: React.FC<{}> = () => {
  const currUser: User = useAuth().getCurrUser();
  const todosRef = ref(db, `users/${currUser.uid}/todos`);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [index, setIndex] = useState<number>(1);
  const [keywords, setKeywords] = useState<string>("");

  // ================================ Filtered list of tasks ==============================================
  const [tasks, setTasks] = useState<ITask[]>([]);

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

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const w = useWindowDimensions().width;

  useEffect(() => {
    onValue(todosRef, (snapshot) => {
      const tmpTodos: Todo[] = [];
      const tmpTasks: ITask[] = [];

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
        if (tasks) {
          for (const taskId in tasks) {
            const task: ITask = tasks[taskId];
            tmpTasks.push(task);
          }
        }
      }
      setTodos(tmpTodos);
      setTasks(tmpTasks);
      setIsLoading(false);
    });
  }, []);

  // ===============================================================
  const selectedStyles = {
    borderLeft: "solid 6px #00494c",
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
  // ===============================================================

  return isLoading ? (
    <Loader />
  ) : (
    <Tabs
      index={index}
      onChange={(i) => setIndex(i)}
      w="100%"
      display="flex"
      flexDir={w < 500 ? "column" : "row"}
      h="100%"
    >
      <TabList w="100%" padding={1} flexBasis="200px" minW="200px">
        <Tab display="none"></Tab>
        <VStack w="100%">
          <InputGroup>
            <Input
              padding={2}
              type="text"
              size="sm"
              onChange={(e) => {
                setIndex(0);
                setKeywords(e.target.value);
              }}
              placeholder="Find task"
            />
            <InputRightElement
              h="100%"
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
          </InputGroup>
          <Divider borderColor="gray.400" />
          <Flex
            direction={w < 500 ? "row" : "column"}
            w="100%"
            flexBasis="50%"
            overflow="scroll"
            borderBottom="solid 1px lightGrey"
          >
            {Object.entries(tabs).map((e) => (
              <Tab _selected={selectedStyles} key={e[0]} marginBottom={0}>
                <TabContent icon={e[1]} text={e[0]} />
              </Tab>
            ))}
          </Flex>

          <Flex
            direction={w < 500 ? "row" : "column"}
            overflow="scroll"
            alignItems="center"
            w="100%"
            flexBasis="50%"
          >
            {todos.map((t) => (
              <Tab
                w="100%"
                _selected={selectedStyles}
                key={t.id}
                marginBottom={0}
              >
                <TabContent icon={AiOutlineUnorderedList} text={t.name} />
              </Tab>
            ))}
          </Flex>
        </VStack>
      </TabList>
      <TabPanels flexGrow={10} h="100%" overflow="hidden">
        {/* ============================ Searched lists ============================ */}
        <TabPanel h="100%" bgColor="#E3E9FB">
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
            tasks={tasks.filter(predicateIncomplete)}
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
            tasks={tasks.filter(predicateImportant)}
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
            tasks={tasks.filter(predicateToday)}
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
            tasks={tasks.filter(predicateCompleted)}
            headerText="Completed"
            headerLeftElement={<Icon as={tabs.Completed} boxSize={5} />}
            headerRightElement={
              <ClearAllTasks tasks={tasks.filter(predicateCompleted)} />
            }
            altText="You have not completed any tasks!"
            altImg="shibaSad.png"
          />
        </TabPanel>
        {/* ============================ Overdue-d Tasks ============================ */}
        <TabPanel h="100%" bgColor="#F9C0C0">
          <TasksBoard
            withLabel
            tasks={tasks.filter(predicateOverdue)}
            headerText="Overdue"
            headerLeftElement={<Icon as={tabs.Overdue} boxSize={5} />}
            altText="Yay! You have no overdue-d tasks!"
            altImg="shibaAmazed.png"
          />
        </TabPanel>
        {/* ============================ Created lists ============================ */}
        {todos.map((t) => (
          <TabPanel h="100%" bgColor="#D2EFED" key={t.id}>
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
              altImg="shibaAmazed.png"
            />
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
