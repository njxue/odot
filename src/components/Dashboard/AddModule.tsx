import { useRef } from "react";
import { db } from "../../config/firebase";
import { ref, push, child, update } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import styles from "../../styles/Button.module.css";
import formStyles from "../../styles/Form.module.css";
import { getTodoRef, getTodosRef } from "../../helpers/refs";
import resetInputField from "../../helpers/resetInputField";
import AddButton from "../layout/AddButton";

export const AddModule: React.FC<{}> = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const currUser = useAuth().getCurrUser();

  const userTodosRef = getTodosRef(currUser.uid);
  function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    const todoId: string | null = push(userTodosRef).key;
    const todoName: string | undefined = inputRef.current?.value;

    if (!todoName || todoName.trim().length == 0) {
      throw Error();
    }

    const todoRef = getTodoRef(currUser.uid, todoId);
    update(todoRef, { name: todoName.trim() }).then(() => {
      resetInputField(inputRef);
    });
  }
  return (
    <form onSubmit={handleAdd} className={formStyles.form}>
      <input required ref={inputRef} type="text" placeholder="New Todo" />
      <AddButton />
    </form>
  );
};
