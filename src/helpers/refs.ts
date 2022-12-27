import { ref } from "firebase/database";
import { db } from "../config/firebase";
import requireNonNull from "./requireNonNull";



const getUserRef = (uid: string | undefined | null) => {
  requireNonNull(uid);
  return ref(db, `users/${uid}`);
};

const getTodosRef = (uid: string | undefined | null) => {
  requireNonNull(uid);
  return ref(db, `users/${uid}/todos`);
};

const getTodoRef = (
  uid: string | undefined | null,
  todoId: string | undefined | null
) => {
  requireNonNull(uid, todoId);
  return ref(db, `users/${uid}/todos/${todoId}`);
};

const getTasksRef = (
  uid: string | undefined | null,
  todoId: string | undefined | null
) => {
  return ref(db, `users/${uid}/todos/${todoId}/tasks`);
};

const getAutosRef = (
  uid: string | undefined | null,
  todoId: string | undefined | null
) => {
  return ref(db, `users/${uid}/todos/${todoId}/autos`);
};

const getTaskRef = (
  uid: string | undefined | null,
  todoId: string | undefined | null,
  taskId: string | undefined | null
) => {
  return ref(db, `users/${uid}/todos/${todoId}/tasks/${taskId}`);
};

const getAutoRef = (
  uid: string | undefined | null,
  todoId: string | undefined | null,
  taskId: string | undefined | null
) => {
  return ref(db, `users/${uid}/todos/${todoId}/autos/${taskId}`);
};

export {
  getUserRef,
  getTodosRef,
  getTodoRef,
  getTasksRef,
  getAutosRef,
  getTaskRef,
  getAutoRef,
};
