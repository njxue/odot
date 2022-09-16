import {
  Accordion,
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
import { db } from "../../config/firebase";
import {
  ref,
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
import { isAfter } from "../../helpers/DateTimeCalculations";
import {
  getAutosRef,
  getTaskRef,
  getTasksRef,
  getTodoRef,
} from "../../helpers/refs";
import IAuto from "../../interface/IAuto";

interface TodoProps {
  todo: Todo;
}

export const TodoMenu: React.FC<TodoProps> = (props) => {
  const todo: Todo = props.todo;
  const currUser = useAuth().getCurrUser();
  const todoRef = getTodoRef(currUser.uid, todo.id);
  const tasksRef = getTasksRef(currUser.uid, todo.id);
  const autosRef = getAutosRef(currUser.uid, todo.id);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [manualTasks, setManualTasks] = useState<ITask[]>([]);
  const [autoTasks, setAutoTasks] = useState<IAuto[]>([]);

  function loadTasks(): void {
    loadManuals();
    loadAutos();
  }

  function loadManuals() {
    onValue(tasksRef, (snapshot) => {
      const tmp: ITask[] = [];
      const data = snapshot.val();
      for (const id in data) {
        tmp.push(data[id]);
      }
      setManualTasks(tmp);
    });
  }

  function loadAutos() {
    get(autosRef).then((snapshot) => {
      const tmp: IAuto[] = [];
      const data = snapshot.val();
      for (const id in data) {
        const task = data[id];
        if (!isAfter(task.nextUpdate, new Date()) || task.isPushed) {
          tmp.push(task);
        }
      }
      setAutoTasks(tmp);
    });
  }

  function updateAutosPushedStatus(autos: IAuto[]): void {
    const batchUpdate: { [key: string]: IAuto } = {};
    for (const k in autos) {
      const auto: IAuto = autos[k];
      auto.isPushed = true;
      const id = auto.id;
      batchUpdate[id] = auto;
    }
    update(autosRef, batchUpdate);
  }

  useEffect(() => {
    loadTasks();
    onChildChanged(autosRef, loadAutos);
    onChildRemoved(autosRef, loadAutos);
  }, []);

  useEffect(() => {
    setTasks([...autoTasks, ...manualTasks]);
    updateAutosPushedStatus(autoTasks);
  }, [manualTasks, autoTasks]);

  return tasks == undefined ? (
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
        <TaskList tasks={tasks} todoId={todo.id} />
        <AddTask todoId={todo.id} />
      </AccordionPanel>
    </AccordionItem>
  );
};
