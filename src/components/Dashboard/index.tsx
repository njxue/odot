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
  Box,
  Flex,
} from "@chakra-ui/react";
import { TasksBoard } from "./TasksBoard";
import { useWindowDimensions } from "../../helpers/windowDimensions";
import { isToday } from "../../helpers/DateTimeCalculations";

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
    marginLeft: "3px",
    borderLeft: "solid 10px maroon",
    fontWeight: "bold",
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
      <TabList w="100%" paddingTop={5} flexGrow={1} flexBasis={0} minW="200px">
        <Tab w="100%" _selected={selectedStyles}>
          Organised
        </Tab>
        <Tab w="100%" _selected={selectedStyles}>
          All
        </Tab>
        <Tab w="100%" _selected={selectedStyles}>
          Important
        </Tab>
        <Tab w="100%" _selected={selectedStyles}>
          Today
        </Tab>
        <Tab w="100%" _selected={selectedStyles}>
          Completed
        </Tab>
      </TabList>
      {w >= 500 && <Divider orientation="vertical" borderColor="black" />}
      <TabPanels flexGrow={1} h="100%" overflow="hidden">
        <TabPanel h="100%">
          <Flex direction="column" maxH="100%">
            <Heading>Welcome back!</Heading>
            <Divider marginTop={3} borderColor="gray" />
            <Organised todos={todos} />
            <AddModule />
          </Flex>
        </TabPanel>
        <TabPanel h="100%">
          <TasksBoard tasks={tasks} header="All" placeholder="Add tasks!" />
        </TabPanel>
        <TabPanel h="100%">
          <TasksBoard
            tasks={importantTasks}
            header="Important"
            placeholder="Try starring some tasks to see them here!"
          />
        </TabPanel>
        <TabPanel h="100%">
          <TasksBoard
            tasks={todayTasks}
            header="Today"
            placeholder="Tasks that are due today show up here!"
          />
        </TabPanel>
        <TabPanel h="100%">
          <TasksBoard
            tasks={completedTasks}
            header="Completed"
            placeholder="Try to complete some tasks to see them here!"
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
