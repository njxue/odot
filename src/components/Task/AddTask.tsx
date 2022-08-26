import React, { useRef } from "react";
import { ref } from "../../config/firebase";
import useAuth from "../../contexts/AuthContext";

interface AddTaskProps {
  todoId: string;
}

const AddTask: React.FC<AddTaskProps> = (props) => {
  const todoId = props.todoId;
  const taskRef = useRef<HTMLInputElement>(null);
  const currUser = useAuth().getCurrUser();

  const tasksRef = ref.child(`users/${currUser.uid}/todos/${todoId}/tasks`);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    const taskName = taskRef.current?.value;
    const taskId = tasksRef.push().key;
    if (taskName == undefined || taskId == undefined) {
      // handle error
    } else {
      tasksRef.child(taskId).update({ name: taskName });
    }
  }

  return (
    <form onSubmit={handleAdd}>
      <input ref={taskRef} type="text" placeholder="Task" />
      <button>Add task</button>
    </form>
  );
};

export default AddTask;
