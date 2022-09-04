import { AddModule } from "./AddModule";
import { ref, onValue } from "firebase/database";
import {db} from "../../config/firebase";
import useAuth from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import Todo from "../../interface/Todo";
import { TodoMenu } from "../Todo";
import dashboardStyles from "../../styles/Dashboard.module.css";


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

  //console.log(todos?.length);

  return todos == undefined ? (
    <div>loading......</div>
  ) : (
    <div>
      <div className={dashboardStyles.addTodo}>
        <h1>Add a Todo: </h1>
        <AddModule />
      </div>
      <div>
        {todos.map((todo) => (
          <TodoMenu todo={todo} />
        ))}
      </div>
    </div>
  );
};
