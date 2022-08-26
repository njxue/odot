import { AddModule } from "./AddModule";
import { ref } from "../../config/firebase";
import useAuth from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import Todo from "../../interface/Todo";
import { TodoMenu } from "../Todo";

interface Props {}

export const Dashboard: React.FC<Props> = (props) => {
  const currUser: User = useAuth().getCurrUser();
  const todosRef = ref.child(`users/${currUser.uid}/todos`);

  const [todos, setTodos] = useState<Todo[] | undefined>(undefined);

  useEffect(() => {
    todosRef.on("value", (snapshot) => {
      const tmp: Todo[] = [];
      const data = snapshot.val();
      for (const todoId in data) {
        const todo: Todo = {
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
      <h1>Welcome back!</h1>
      <AddModule />
      <div>
        {todos.map((todo) => (
          <TodoMenu todo={todo} />
        ))}
      </div>
    </div>
  );
};
