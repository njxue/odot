import { AddModule } from "./AddModule";
import { ref, onValue } from "firebase/database";
import { db } from "../../config/firebase";
import useAuth from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import Todo from "../../interface/Todo";
import { TodoMenu } from "../Todo";
import dashboardStyles from "../../styles/Dashboard.module.css";
import { Accordion } from "@chakra-ui/react";
import todoStyles from "../../styles/Todo.module.css";
import Loader from "../layout/Loader";

export const Dashboard: React.FC<{}> = () => {
  const currUser: User = useAuth().getCurrUser();
  const todosRef = ref(db, `users/${currUser.uid}/todos`);

  const [todos, setTodos] = useState<Todo[] | undefined>(undefined);

  useEffect(() => {
    onValue(todosRef, (snapshot) => {
      const tmp: Todo[] = [];
      const data = snapshot.val();
      for (const todoId in data) {
        const todo: Todo = {
          id: todoId,
          name: data[todoId].name,
          tasks: data[todoId].tasks,
        };
        tmp.push(todo);
      }
      setTodos(tmp);
    });
  }, []);

  return todos == undefined ? (
    <Loader />
  ) : (
    <div>
      <div className={dashboardStyles.addTodo}>
        <AddModule />
      </div>
      <Accordion allowMultiple allowToggle>
        {todos.map((todo) => (
          <TodoMenu todo={todo} key={todo.id} />
        ))}
      </Accordion>
    </div>
  );
};
