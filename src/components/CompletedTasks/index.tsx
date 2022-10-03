import ITask from "../../interface/ITask";
import { Task } from "../Task";
import styles from "../../styles/Task.module.css";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { Icon } from "@chakra-ui/react";

interface CompletedTasksProps {
  tasks: ITask[];
}

const CompletedTasks: React.FC<CompletedTasksProps> = (props) => {
  const { tasks } = props;

  return (
    <div className={styles.taskList}>
      <div className={styles.header}>
        <Icon as={MdOutlineFileDownloadDone} />
        <b>Completed</b>
      </div>
      <ol>
        {tasks.map((task) => (
          <li key={task.id}>
            <Task task={task} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CompletedTasks;
