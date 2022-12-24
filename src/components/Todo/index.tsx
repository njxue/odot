import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  HStack,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import Todo from "../../interface/Todo";
import ITask from "../../interface/ITask";
import { get, update } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import TaskList from "../TaskList";
import AddTask from "../Task/AddTask";
import todoStyles from "../../styles/Todo.module.css";
import SettingsModal from "./SettingsModal";
import {
  calculateNextUpdateTime,
  isAfter,
} from "../../helpers/DateTimeCalculations";
import { getAutosRef, getTasksRef } from "../../helpers/refs";
import IAuto from "../../interface/IAuto";
import Progress from "./Progress";
import { SettingsIcon } from "@chakra-ui/icons";
import { Settings } from "./Settings";

interface TodoProps {
  todo: Todo;
}

export const TodoMenu: React.FC<TodoProps> = (props) => {
  const todo: Todo = props.todo;
  const currUser = useAuth().getCurrUser();

  const tasksRef = getTasksRef(currUser.uid, todo.id);
  const autosRef = getAutosRef(currUser.uid, todo.id);

  const { onOpen, isOpen, onClose } = useDisclosure();

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [autoTasksToPush, setAutoTasksToPush] = useState<IAuto[]>([]);
  const [percentComplete, setPercentComplete] = useState<number>(0);

  function loadAutos() {
    get(autosRef).then((snapshot) => {
      console.log("get autos");
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
  }

  // Push (copy) autos into the list of incomplete tasks
  function pushAutoTasks(tasks: IAuto[]): void {
    const batchUpdate: { [key: string]: ITask } = {}; // tasks to be pushed to the main list
    const batchUpdateTime: { [key: string]: Date } = {};

    for (const k in tasks) {
      const task: IAuto = tasks[k];
      batchUpdate[task.id] = task;
      batchUpdateTime[`${task.id}/nextUpdate`] = calculateNextUpdateTime(
        task.freq
      );
    }
    update(tasksRef, batchUpdate);
    // Update next update time
    update(autosRef, batchUpdateTime);
  }

  useEffect(() => {
    const tmpTasks: ITask[] = [];
    if (todo.tasks != undefined) {
      for (const taskId in todo.tasks) {
        const task: ITask = todo.tasks[taskId];
        if (!task.isCompleted) {
          tmpTasks.push(task);
        }
      }
    }

    setTasks(tmpTasks);
  }, [todo]);

  useEffect(() => {
    pushAutoTasks(autoTasksToPush);
  }, [autoTasksToPush]);

  // autos should only load once per page load because if a PUSHED auto has past its nextUpdateTime, deleting it/marking it as
  // important will trigger another push. i.e. deleting/marking the auto should not trigger a push.
  // Therefore, loadAutos() should run once when the page is mounted and should not be placed inside the useEffect with [todo],
  // because the useEffect with [todo] runs everytime a task is updated/deleted, triggeriing a page re-render.
  useEffect(() => {
    loadAutos();
  }, []);

  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <div>
          <h2>
            <AccordionButton fontSize="xl">
              <HStack
                justifyContent="space-between"
                w="100%"
                alignItems="center"
              >
                <h1>
                  <b>{todo.name}</b>
                  <Progress value={percentComplete} />
                </h1>
                <AccordionIcon />
              </HStack>
            </AccordionButton>
          </h2>

          <AccordionPanel bgColor="#E7E7E7">
            <div className={todoStyles.taskContainer}>
              <div className={todoStyles.incompleteTasks}>
                {todo.tasks && <TaskList tasks={tasks} />}
              </div>
            </div>
            <div className={todoStyles.footer}>
              <AddTask todoId={todo.id} />
              <Settings todoId={todo.id} />
            </div>
          </AccordionPanel>
        </div>
      )}
    </AccordionItem>
  );
};
