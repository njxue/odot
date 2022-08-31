import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import Todo from "../../interface/Todo";
import ITask from "../../interface/ITask";
import { ref } from "../../config/firebase";
import useAuth from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import TaskList from "../TaskList";
import AddTask from "../Task/AddTask";

interface TodoProps {
  todo: Todo;
}

export const TodoMenu: React.FC<TodoProps> = (props) => {
  const todo: Todo = props.todo;
  const currUser = useAuth().getCurrUser();
  const tasksRef = ref.child(`users/${currUser.uid}/todos/${todo.id}/tasks`);

  const [tasks, setTasks] = useState<ITask[] | undefined>();

  useEffect(() => {
    tasksRef.on("value", (snapshot) => {
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
    <Accordion allowMultiple allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            {todo.name}
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <TaskList tasks={tasks} todoId={todo.id}/>
          <AddTask todoId={todo.id}/>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
