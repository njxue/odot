import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  HStack,
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
    pushAutoTasks(autoTasksToPush);
  }, [autoTasksToPush]);

  return incompleteTasks == undefined || completedTasks == undefined ? (
    <div>loading......</div>
  ) : (
    <AccordionItem className={todoStyles.todo}>
      <h2>
        <AccordionButton fontSize="xl">
          <HStack justifyContent="space-between" w="100%">
            <h1>
              <b>{todo.name}</b>
            </h1>
            <AccordionIcon />
          </HStack>
        </AccordionButton>
      </h2>
      <AccordionPanel>
        <button onClick={onOpen}>settings</button>
        <SettingsModal isOpen={isOpen} onClose={onClose} todoId={todo.id} />
        <Divider borderColor="black" />
        <div className={todoStyles.taskContainer}>
          <div className={todoStyles.incompleteTasks}>
            <TaskList tasks={incompleteTasks} todoId={todo.id} />
          </div>
          <div className={todoStyles.completedTasks}>
            <CompletedTasks tasks={completedTasks} />
          </div>
        </div>
        <AddTask todoId={todo.id} />
      </AccordionPanel>
    </AccordionItem>
  );
};
