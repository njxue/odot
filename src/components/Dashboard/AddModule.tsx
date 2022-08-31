import { useRef } from "react";
import { ref } from "../../config/firebase";
import useAuth from "../../contexts/AuthContext";

export const AddModule: React.FC<{}> = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const currUser  = useAuth().getCurrUser();
  
  const userTodosRef = ref.child(`users/${currUser.uid}/todos`);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const todoId: string | null = userTodosRef.push().key;
    const todoName: string | undefined = inputRef.current?.value;
    if (todoId == null || todoName == undefined || todoName.trim().length == 0) {
      console.log("ERROR");
    } else {
      userTodosRef.child(todoId).update({"name": todoName.trim()});
    }
  }
  return (
    <>
      <form onSubmit={handleAdd}>
        <input required ref={inputRef} type="text" placeholder="Module" />
        <button type="submit">Add</button>
      </form>
    </>
  );
};
