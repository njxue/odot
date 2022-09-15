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
import { ref, onValue } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import TaskList from "../TaskList";
import AddTask from "../Task/AddTask";
import todoStyles from "../../styles/Todo.module.css";
import SettingsModal from "./SettingsModal";
import { isAfter } from "../../helpers/DateTimeCalculations";
import { getTaskRef, getTodoRef } from "../../helpers/refs";

interface TodoProps {
  todo: Todo;
}

export const TodoMenu: React.FC<TodoProps> = (props) => {
  const todo: Todo = props.todo;
  const currUser = useAuth().getCurrUser();
  const todoRef = getTodoRef(currUser.uid, todo.id);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [tasks, setTasks] = useState<ITask[]>([]);

  function loadTasks(): void {
    onValue(todoRef, (snapshot) => {
      const manualTasks: ITask[] = [];
      const autoTasks: ITask[] = [];

      const data = snapshot.val();
      const autos = data.autos;
      const manuals = data.tasks;

      for (const taskId in manuals) {
        const task: ITask = manuals[taskId];
        manualTasks.push(task);
      }

      for (const taskId in autos) {
        const task: ITask = autos[taskId];
        if (task.isAuto && !isAfter(task.nextUpdate, new Date())) {
          autoTasks.push(task);
        }
      }

      const allTasks: ITask[] = [...manualTasks, ...autoTasks];

      setTasks(allTasks);
    });
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return tasks == undefined ? (
    <div>loading......</div>
  ) : (
    <Accordion allowMultiple allowToggle className={todoStyles.todo}>
      <AccordionItem>
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
    </Accordion>
  );
};
