import { ChangeEvent } from "react";
import TimeInterval from "../../helpers/TimeInterval";
import autoStyles from "../../styles/Auto.module.css";

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
    TimeInterval.SECONDS,
  ];

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const value: number = parseInt(e.target.value);
    const interval: TimeInterval = intervals[value];
    onChange(interval);
  }
  return (
    <select
      name="updateFreq"
      onChange={handleChange}
      className={autoStyles.select}
      defaultValue={defaultValue}
    >
      <option value="0">Day</option>
      <option value="1">Week</option>
      <option value="2">Month</option>
      <option value="3">5 seconds</option>
    </select>
  );
};

export default SelectFreq;
