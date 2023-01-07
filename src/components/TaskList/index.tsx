import ITask from "../../interface/ITask";
import { Task } from "../Task";
import styles from "../../styles/Task.module.css";

import useUserPrefs from "../../contexts/UserPrefs";
import { useState, useEffect } from "react";
import { SORT_ORDER, getSortedTasks } from "../../helpers/tasks-sort";

interface TaskListProps {
  tasks: ITask[];
  withLabel?: boolean;
}

const TaskList: React.FC<TaskListProps> = (props) => {
  const { tasks, withLabel } = props;
  const [sortedTasks, setSortedTasks] = useState<ITask[]>(tasks);

  let { sortOrder } = useUserPrefs();

  // In case the user changes the value stored in localstorage
  if (Object.values(SORT_ORDER).indexOf(sortOrder) === -1) {
    sortOrder = SORT_ORDER.DATE_ADDED;
  }

  useEffect(() => {
    setSortedTasks(getSortedTasks(tasks, sortOrder));
  }, [sortOrder, tasks]);

  return (
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
