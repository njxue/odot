import { ref, onValue } from "firebase/database";
import { db } from "../../config/firebase";
import useAuth from "../../contexts/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { User } from "firebase/auth";
import ITodo from "../../interface/ITodo";
import ITask from "../../interface/ITask";
import Loader from "../layout/Loader";
import { Tabs, useColorModeValue } from "@chakra-ui/react";

import { AiOutlineFieldTime } from "react-icons/ai";
import { RiArchiveDrawerFill } from "react-icons/ri";
import { MdOutlineCalendarToday } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { useWindowDimensions } from "../../helpers/useWindowDimensions";
import { CheckIcon, StarIcon } from "@chakra-ui/icons";
import { TabNav } from "./TabNav";
import { TabWindows } from "./TabWindows";

export const Dashboard: React.FC<{}> = () => {
  const currUser: User = useAuth().getCurrUser();
  const todosRef = ref(db, `users/${currUser.uid}/todos`);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [index, setIndex] = useState<number>(1);
  const [keywords, setKeywords] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const w = useWindowDimensions().width;

  useEffect(() => {
    onValue(todosRef, (snapshot) => {
      const tmpTodos: ITodo[] = [];
      const tmpTasks: ITask[] = [];

      const data = snapshot.val();
      for (const todoId in data) {
        const name: string = data[todoId].name;
        const tasks = data[todoId].tasks;

        const todo: ITodo = {
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

  const tabs = {
    Organised: {
      icon: RiArchiveDrawerFill,
      color: useColorModeValue("#F2F2F2", "#415F5F"),
    },
    All: {
      icon: TbListDetails,
      color: useColorModeValue("#D2EFED", "#415F5F"),
    },
    Important: {
      icon: StarIcon,
      color: useColorModeValue("#F3DDBF", "#415F5F"),
    },
    Today: {
      icon: MdOutlineCalendarToday,
      color: useColorModeValue("#F4DFD1", "#415F5F"),
    },
    Completed: {
      icon: CheckIcon,
      color: useColorModeValue("#BFF3C3", "#415F5F"),
    },
    Overdue: {
      icon: AiOutlineFieldTime,
      color: useColorModeValue("#F9C0C0", "#415F5F"),
    },
  };

  const memoTabs = useMemo(() => tabs, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Tabs
      isLazy
      index={index}
      onChange={(i) => setIndex(i)}
      w="100%"
      display="flex"
      flexDir={w < 500 ? "column" : "row"}
      h="100%"
    >
      <TabNav
        todos={todos}
        setIndex={setIndex}
        setKeywords={setKeywords}
        tabs={memoTabs}
      />
      <TabWindows
        todos={todos}
        tasks={tasks}
        keywords={keywords}
        tabs={memoTabs}
      />
    </Tabs>
  );
};
