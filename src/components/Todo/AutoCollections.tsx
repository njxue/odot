import { Divider } from "@chakra-ui/react";
import IAuto from "../../interface/IAuto";
import autoStyles from "../../styles/Auto.module.css";
import Auto from "./Auto";

interface AutomatedTasksProps {
  tasks: IAuto[];
}

const AutoCollections: React.FC<AutomatedTasksProps> = (props) => {
  const { tasks } = props;
  return (
    <div className={autoStyles.container}>
      {tasks.map((task) => (
        <>
          <Auto task={task} />
          <Divider borderColor="black" />
        </>
      ))}
    </div>
  );
};

export default AutoCollections;
