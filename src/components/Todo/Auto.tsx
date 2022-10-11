import IAuto from "../../interface/IAuto";
import autoStyles from "../../styles/Auto.module.css";
import btnStyles from "../../styles/Button.module.css";
import { getAutoRef } from "../../helpers/refs";
import useAuth from "../../contexts/AuthContext";
import { remove, update } from "firebase/database";
import SelectFreq from "./SelectFreq";
import TimeInterval, { intervalToFreq } from "../../helpers/TimeInterval";
import { calculateNextUpdateTime } from "../../helpers/DateTimeCalculations";
import TaskList from "../TaskList";
import { DeleteIcon } from "@chakra-ui/icons";

interface AutoProps {
  task: IAuto;
  todoId: string;
}

const Auto: React.FC<AutoProps> = (props) => {
  const { task, todoId } = props;
  const autoRef = getAutoRef(useAuth().getCurrUser().uid, todoId, task.id);

  function handleDelete(): void {
    remove(autoRef);
  }

  function handleIntervalChange(interval: TimeInterval) {
    update(autoRef, {
      nextUpdate: calculateNextUpdateTime(interval),
      freq: intervalToFreq(interval),
    });
  }

  return (
    <div className={autoStyles.auto}>
      <p>{task.name}</p>
      <div className={autoStyles.options}>
        <SelectFreq
          onChange={handleIntervalChange}
          defaultValue={task.freq.toString()}
        />
        <DeleteIcon onClick={handleDelete} cursor="pointer" color="gray" />
      </div>
    </div>
  );
};

export default Auto;
