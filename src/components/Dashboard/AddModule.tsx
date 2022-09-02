import { useRef } from "react";
import { db } from "../../config/firebase";
import { ref, push, child, update } from "firebase/database";
import useAuth from "../../contexts/AuthContext";
import styles from "../../styles/Button.module.css";
import formStyles from "../../styles/Form.module.css";

export const AddModule: React.FC<{}> = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const currUser = useAuth().getCurrUser();

  const userTodosRef = ref(db, `users/${currUser.uid}/todos`);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const todoId: string | null = push(userTodosRef).key;
    const todoName: string | undefined = inputRef.current?.value;
    if (
      todoId == null ||
      todoName == undefined ||
      todoName.trim().length == 0
    ) {
      console.log("ERROR");
    } else {
      update(child(userTodosRef, todoId), { name: todoName.trim() });
    }
  }
  return (
    <>
      <form onSubmit={handleAdd} className={formStyles.form}>
        <input required ref={inputRef} type="text" placeholder="Module" />
        <button type="submit" className={styles.addBtn}>
          Add
        </button>
      </form>
    </>
  );
};
