import { ref, remove } from "firebase/database";
import { db } from "../../config/firebase";
import useAuth from "../../contexts/AuthContext";
import IAuto from "../../interface/IAuto";
import ITask from "../../interface/ITask";
import autoStyles from "../../styles/Auto.module.css";

interface AutomatedTasksProps {
  tasks: ITask[];
  todoId: String;
}

const AutomatedTasks: React.FC<AutomatedTasksProps> = (props) => {
  const currUser = useAuth().getCurrUser();

  function handleDelete(taskId: String): void {
    const taskRef = ref(
      db,
      `users/${currUser.uid}/todos/${props.todoId}/autos/${taskId}`
    );
    remove(taskRef);
  }


  const tasks = props.tasks;
  return (
    <div className={autoStyles.container}>
      {tasks.map((task) => (
        <div className={autoStyles.auto}>
          <p>{task.name}</p>
          <button onClick={() => handleDelete(task.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default AutomatedTasks;
