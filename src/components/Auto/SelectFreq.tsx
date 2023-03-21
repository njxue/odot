import { ChangeEvent } from "react";
import TimeInterval from "../../helpers/TimeInterval";
import autoStyles from "../../styles/Auto.module.css";
import { Select } from "@chakra-ui/react";

interface SelectFreqProps {
  defaultValue?: string;
  onChange: (interval: TimeInterval) => void;
}

const SelectFreq: React.FC<SelectFreqProps> = (props) => {
  const { defaultValue, onChange } = props;
  const intervals: TimeInterval[] = [
    TimeInterval.DAY,
    TimeInterval.WEEK,
    TimeInterval.MONTH,
  ];

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const value: number = parseInt(e.target.value);
    const interval: TimeInterval = intervals[value];
    onChange(interval);
  }
  return (
    <Select
      fontSize="sm"
      name="updateFreq"
      onChange={handleChange}
      defaultValue={defaultValue}
    >
      <option value="0">Day</option>
      <option value="1">Week</option>
      <option value="2">Month</option>
    </Select>
  );
};

export default SelectFreq;
