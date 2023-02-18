import ITask from "../../interface/ITask";
import { Task } from "../Task";
import styles from "../../styles/Task.module.css";
import useUserPrefs from "../../contexts/UserPrefs";
 
import {
  SortMetric,
  SortOrder,
  getSortedTasks,
} from "../../helpers/tasks-sort";
 

interface TaskListProps {
  tasks: ITask[];
  withLabel?: boolean;
}

const TaskList: React.FC<TaskListProps> = (props) => {
  const { tasks, withLabel } = props;

  let { sortMetric, sortOrder } = useUserPrefs();

  // In case the user changes the values stored in localstorage
  if (Object.values(SortMetric).indexOf(sortMetric) === -1) {
    sortMetric = SortMetric.DATE_ADDED;
  }

  if (Object.values(SortOrder).indexOf(sortOrder) === -1) {
    sortOrder = SortOrder.DSC;
  }

   
  return (
    <div className={styles.taskList}>
      <ol>
        {getSortedTasks(tasks, sortMetric, sortOrder).map((task) => (
          <li key={task.id}>
            <Task task={task} withLabel={withLabel} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TaskList;
