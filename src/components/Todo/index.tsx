import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  HStack,
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

interface TodoProps {
  todo: Todo;
}

export const TodoMenu: React.FC<TodoProps> = (props) => {
  const todo: Todo = props.todo;
  const currUser = useAuth().getCurrUser();
  const tasksRef = ref(db, `users/${currUser.uid}/todos/${todo.id}/tasks`);

  const [tasks, setTasks] = useState<ITask[] | undefined>();

  useEffect(() => {
    onValue(tasksRef, (snapshot) => {
      const tmp: ITask[] = [];
      const data = snapshot.val();
      for (const taskId in data) {
        const task: ITask = {
          name: data[taskId].name,
          id: taskId,
        };
        tmp.push(task);
      }
      setTasks(tmp);
    });
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
          <Divider borderColor="black" />
          <TaskList tasks={tasks} todoId={todo.id} />
          <AddTask todoId={todo.id} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
