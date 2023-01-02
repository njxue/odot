import { ref, onValue } from "firebase/database";
import { db } from "../../config/firebase";
import useAuth from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import ITodo from "../../interface/ITodo";
import ITask from "../../interface/ITask";
import Loader from "../layout/Loader";
import { Tabs } from "@chakra-ui/react";

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
    Organised: { icon: RiArchiveDrawerFill, color: "#F2F2F2" },
    All: { icon: TbListDetails, color: "#D2EFED" },
    Important: { icon: StarIcon, color: "#F3DDBF" },
    Today: { icon: MdOutlineCalendarToday, color: "#F4DFD1" },
    Completed: { icon: CheckIcon, color: "#BFF3C3" },
    Overdue: { icon: AiOutlineFieldTime, color: "#F9C0C0" },
  };

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
      <TabNav
        todos={todos}
        setIndex={setIndex}
        setKeywords={setKeywords}
        tabs={tabs}
      />
      <TabWindows todos={todos} tasks={tasks} keywords={keywords} tabs={tabs} />
    </Tabs>
  );
};
