import ITask from "../../interface/ITask";

interface TaskProps {
  task: ITask;
}

export const Task: React.FC<TaskProps> = (props) => {
  return <div>{props.task.name}</div>;
};
