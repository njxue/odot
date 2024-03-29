import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import ITodo from "../../interface/ITodo";
import ITask from "../../interface/ITask";
import { get, update } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import TaskList from "../TaskList";
import AddTask from "../Task/AddTask";
import todoStyles from "../../styles/Todo.module.css";
import {
  calculateNextUpdateTime,
  isAfter,
} from "../../helpers/date-time-calculations";
import { getAutosRef, getTasksRef } from "../../helpers/refs";
import IAuto from "../../interface/IAuto";
import Progress from "./Progress";
import { TodoSettings } from "../TodoSettings";
import getDatabaseKey from "../../helpers/get-db-key";
import { MdBrightness1 } from "react-icons/md";
import { UserPrefsProvider } from "../../contexts/UserPrefs";
import {
  darkSecondary,
  lightPrimary,
  lightSecondary,
} from "../../styles/global-colours";

interface TodoProps {
  todo: ITodo;
}

export const TodoMenu: React.FC<TodoProps> = (props) => {
  const todo: ITodo = props.todo;
  const currUser = useAuth().getCurrUser();

  const tasksRef = getTasksRef(currUser.uid, todo.id);
  const autosRef = getAutosRef(currUser.uid, todo.id);

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [autoTasksToPush, setAutoTasksToPush] = useState<IAuto[]>([]);
  const [percentComplete, setPercentComplete] = useState<number>(0);

  // autos should only load once per page load because if a PUSHED auto has past its nextUpdateTime, deleting it/marking it as
  // important will trigger another push. i.e. deleting/marking the auto should not trigger a push.
  // Therefore, this should run once when the page is mounted and should not be placed inside the useEffect with [todo],
  // because the useEffect with [todo] runs everytime a task is updated/deleted, triggeriing a page re-render.
  useEffect(() => {
    get(autosRef).then((snapshot) => {
      const data = snapshot.val();
      const tmp: IAuto[] = [];
      for (const id in data) {
        const task: IAuto = data[id];
        if (!isAfter(task.nextUpdate, new Date())) {
          tmp.push(task);
        }
      }
      setAutoTasksToPush(tmp);
    });
  }, []);

  // Push (a copy of each) autos into the list of incomplete tasks
  function pushAutoTasks(tasks: IAuto[]): void {
    const batchUpdate: { [key: string]: ITask } = {}; // tasks to be pushed to the main list
    const batchUpdateTime: { [key: string]: Date } = {};

    for (const k in tasks) {
      const auto: IAuto = tasks[k];
      const { freq, nextUpdate, ...task } = auto;
      const id: string = getDatabaseKey(tasksRef);
      const dueDate: Date = calculateNextUpdateTime(auto.freq, auto.timeOffset);
      const newTask: ITask = { ...task, dueDate, id };
      batchUpdate[id] = newTask;
      batchUpdateTime[`${task.id}/nextUpdate`] = dueDate;
    }
    update(tasksRef, batchUpdate);
    // Update next update time
    update(autosRef, batchUpdateTime);
  }

  useEffect(() => {
    const tmpTasks: ITask[] = [];
    let numIncomplete = 0;
    let total = 0;
    if (todo.tasks != null) {
      for (const taskId in todo.tasks) {
        const task: ITask = todo.tasks[taskId];
        if (!task.isCompleted) {
          tmpTasks.push(task);
          numIncomplete++;
        }
        total++;
      }
    }
    setPercentComplete(
      total === 0 ? 0 : Math.round(((total - numIncomplete) * 100) / total)
    );
    setTasks(tmpTasks);
  }, [todo]);

  useEffect(() => {
    pushAutoTasks(autoTasksToPush);
  }, [autoTasksToPush]);

  const accordionBgColor = useColorModeValue(lightPrimary, "transparent");
  const accordionHoverColor = useColorModeValue(lightPrimary, darkSecondary);
  const accordionExpandedBorderColor = useColorModeValue(
    lightPrimary,
    darkSecondary
  );
  const panelBgColor = useColorModeValue(lightSecondary, darkSecondary);

  return (
    <AccordionItem
      bgColor={accordionBgColor}
      _hover={{ backgroundColor: accordionHoverColor }}
    >
      <AccordionButton
        fontSize="xl"
        _expanded={{
          backgroundColor: panelBgColor,
          borderBottom: "3px solid",
          borderTop: "3px solid",
          borderColor: accordionExpandedBorderColor,
        }}
      >
        <HStack
          justifyContent="space-between"
          w="100%"
          alignItems="center"
          alignContent="start"
        >
          <Text fontWeight="bold" textAlign="start">
            {todo.name}
          </Text>
          <HStack gap={3}>
            {<Progress value={percentComplete} />}
            <AccordionIcon />
          </HStack>
        </HStack>
      </AccordionButton>

      <AccordionPanel bgColor={panelBgColor} maxW="100%">
        <div className={todoStyles.taskContainer}>
          {todo.tasks && <TaskList tasks={tasks} />}
        </div>
        <HStack maxW="100%">
          <AddTask todoId={todo.id} todoName={todo.name} />
          <TodoSettings todoId={todo.id} todoName={todo.name} />
        </HStack>
      </AccordionPanel>
    </AccordionItem>
  );
};
