import IAuto from "../../interface/IAuto";
import autoStyles from "../../styles/Auto.module.css";
import Auto from ".";
import { Divider } from "@chakra-ui/react";

interface AutomatedTasksProps {
  tasks: IAuto[] | undefined;
}

const AutoCollections: React.FC<AutomatedTasksProps> = (props) => {
  const { tasks } = props;
  return (
    <div className={autoStyles.container}>
      {tasks &&
        tasks.map((task) => (
          <>
            <Auto task={task} key={task.id} />
            <Divider />
          </>
        ))}
    </div>
  );
};

export default AutoCollections;
