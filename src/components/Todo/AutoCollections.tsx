import IAuto from "../../interface/IAuto";
import autoStyles from "../../styles/Auto.module.css";
import Auto from "./Auto";

interface AutomatedTasksProps {
  tasks: IAuto[];
  todoId: string;
}

const AutoCollections: React.FC<AutomatedTasksProps> = (props) => {
  const { tasks, todoId } = props;

  return (
    <div className={autoStyles.container}>
      {tasks.map((task) => (
        <Auto task={task} todoId={todoId} />
      ))}
    </div>
  );
};

export default AutoCollections;
