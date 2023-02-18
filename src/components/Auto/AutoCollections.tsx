import IAuto from "../../interface/IAuto";
import autoStyles from "../../styles/Auto.module.css";
import Auto from ".";

interface AutomatedTasksProps {
  tasks: IAuto[] | undefined;
}

const AutoCollections: React.FC<AutomatedTasksProps> = (props) => {
  const { tasks } = props;
  return (
    <div className={autoStyles.container}>
      {tasks && tasks.map((task) => (
        <Auto task={task} key={task.id} />
      ))}
    </div>
  );
};

export default AutoCollections;
