import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  HStack,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import Todo from "../../interface/Todo";
import ITask from "../../interface/ITask";
import {
  onValue,
  get,
  update,
  onChildRemoved,
  onChildChanged,
} from "firebase/database";
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
import { getAutosRef, getTasksRef, getTodoRef } from "../../helpers/refs";
import IAuto from "../../interface/IAuto";
import CompletedTasks from "../CompletedTasks";
import Progress from "./Progress";
import { SettingsIcon } from "@chakra-ui/icons";
import Loader from "../layout/Loader";

interface TodoProps {
  todo: Todo;
}

export const TodoMenu: React.FC<TodoProps> = (props) => {
  const todo: Todo = props.todo;
  const currUser = useAuth().getCurrUser();
  const tasksRef = getTasksRef(currUser.uid, todo.id);
  const autosRef = getAutosRef(currUser.uid, todo.id);
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [autoTasksToPush, setAutoTasksToPush] = useState<IAuto[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);
  const [incompleteTasks, setIncompleteTasks] = useState<ITask[]>([]);
  const [percentComplete, setPercentComplete] = useState<number>(0);

  function loadTasks(): void {
    loadAutos();
    loadManuals();
  }

  function loadManuals() {
    onValue(tasksRef, (snapshot) => {
      const incomplete: ITask[] = [];
      const completed: ITask[] = [];
      const data = snapshot.val();
      for (const id in data) {
        const task: ITask = data[id];
        if (task.isCompleted) {
          completed.push(task);
        } else {
          incomplete.push(task);
        }
      }

      incomplete.sort((task1, task2) => {
        if (task1.isImportant && task2.isImportant) {
          if (task1.name < task2.name) {
            return -1;
          }
          return 1;
        }

        if (task1.isImportant) {
          return -1;
        }

        return 1;
      });

      setIncompleteTasks(incomplete);
      setCompletedTasks(completed);
    });
  }

  function loadAutos() {
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
  }

  function pushAutoTasks(tasks: IAuto[]): void {
    const batchUpdate: { [key: string]: ITask } = {};
    const batchUpdateTime: { [key: string]: Date } = {};
    for (const k in tasks) {
      const task: IAuto = tasks[k];
      batchUpdate[task.id] = task;
      batchUpdateTime[`${task.id}/nextUpdate`] = calculateNextUpdateTime(
        task.freq
      );
    }
    update(tasksRef, batchUpdate);
    update(autosRef, batchUpdateTime);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    const totalTasksLength = completedTasks.length + incompleteTasks.length;
    if (totalTasksLength != 0) {
      setPercentComplete(
        Math.round((100 * completedTasks.length) / totalTasksLength)
      );
    }
  }, [completedTasks, incompleteTasks]);

  useEffect(() => {
    pushAutoTasks(autoTasksToPush);
  }, [autoTasksToPush]);

  return incompleteTasks == undefined || completedTasks == undefined ? (
    <Loader />
  ) : (
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

          <AccordionPanel
            bgColor="rgb(236, 236, 236)"
            border={isExpanded ? "solid 3px" : "white"}
          >
            <SettingsModal isOpen={isOpen} onClose={onClose} todoId={todo.id} />
            <div className={todoStyles.taskContainer}>
              <div className={todoStyles.incompleteTasks}>
                <TaskList tasks={incompleteTasks} todoId={todo.id} />
              </div>
              <div className={todoStyles.completedTasks}>
                <CompletedTasks tasks={completedTasks} />
              </div>
            </div>
            <div className={todoStyles.footer}>
              <AddTask todoId={todo.id} />
              <Tooltip label="configure">
                <SettingsIcon onClick={onOpen} cursor="pointer" />
              </Tooltip>
            </div>
          </AccordionPanel>
        </div>
      )}
    </AccordionItem>
  );
};
