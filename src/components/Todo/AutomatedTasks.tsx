import { ref, remove } from "firebase/database";
import { db } from "../../config/firebase";
import useAuth from "../../contexts/AuthContext";
import { getAutoRef } from "../../helpers/refs";
import IAuto from "../../interface/IAuto";
import ITask from "../../interface/ITask";
import autoStyles from "../../styles/Auto.module.css";

interface AutomatedTasksProps {
  tasks: ITask[];
  todoId: string;
}

const AutomatedTasks: React.FC<AutomatedTasksProps> = (props) => {
  const { tasks, todoId } = props;
  const currUser = useAuth().getCurrUser();

  function handleDelete(taskId: string): void {
    const taskRef = getAutoRef(currUser.uid, todoId, taskId);
    remove(taskRef);
  }

  return (
    <div className={autoStyles.container}>
      {tasks.map((task) => (
        <div key={task.id}>
          <div className={autoStyles.auto}>
            <p>{task.name}</p>
            <button onClick={() => handleDelete(task.id)}>delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AutomatedTasks;
