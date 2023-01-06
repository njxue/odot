import { useRef } from "react";
import { update } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import formStyles from "../../styles/Form.module.css";
import { getTodoRef, getTodosRef } from "../../helpers/refs";
import resetInputField from "../../helpers/resetInputField";
import AddButton from "../layout/AddButton";
import { maxTodoNameLength } from "../../helpers/global-constants";
import requireNonNull from "../../helpers/requireNonNull";
import getDatabaseKey from "../../helpers/get-db-key";

export const AddModule: React.FC<{}> = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const currUser = useAuth().getCurrUser();
  const userTodosRef = getTodosRef(currUser.uid);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    const todoId: string = getDatabaseKey(userTodosRef);
    let todoName: string | undefined = inputRef.current?.value;

    requireNonNull(todoName);

    // todoName is defined
    todoName = todoName!.trim();
    if (todoName.length == 0) {
      return;
    }

    const todoRef = getTodoRef(currUser.uid, todoId);
    resetInputField(inputRef);
    update(todoRef, { name: todoName!.trim().substring(0, maxTodoNameLength) });
  }
  return (
    <form onSubmit={handleAdd} className={formStyles.form}>
      <input required ref={inputRef} type="text" placeholder="New List" />
      <AddButton />
    </form>
  );
};
