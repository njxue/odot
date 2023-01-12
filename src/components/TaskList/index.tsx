import ITask from "../../interface/ITask";
import { Task } from "../Task";
import styles from "../../styles/Task.module.css";
import useUserPrefs from "../../contexts/UserPrefs";
import { useState, useEffect } from "react";
import {
  SortMetric,
  SortOrder,
  getSortedTasks,
} from "../../helpers/tasks-sort";
import Loader from "../layout/Loader";

interface TaskListProps {
  tasks: ITask[];
  withLabel?: boolean;
}

const TaskList: React.FC<TaskListProps> = (props) => {
  const { tasks, withLabel } = props;
  const [sortedTasks, setSortedTasks] = useState<ITask[]>(tasks);
  const [isLoading, setisLoading] = useState<boolean>(true);

  let { sortMetric, sortOrder } = useUserPrefs();

  // In case the user changes the values stored in localstorage
  if (Object.values(SortMetric).indexOf(sortMetric) === -1) {
    sortMetric = SortMetric.DATE_ADDED;
  }

  if (Object.values(SortOrder).indexOf(sortOrder) === -1) {
    sortOrder = SortOrder.DSC;
  }

  useEffect(() => {
    setSortedTasks(getSortedTasks(tasks, sortMetric, sortOrder));
  }, [sortMetric, sortOrder, tasks]);

  useEffect(() => {
    setisLoading(false);
  }, [sortedTasks]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={styles.taskList}>
      <ol>
        {sortedTasks.map((task) => (
          <li key={task.id}>
            <Task task={task} withLabel={withLabel} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TaskList;
