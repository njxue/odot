import { CheckIcon } from "@chakra-ui/icons";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface ProgressProps {
  value: number;
}
const Progress: React.FC<ProgressProps> = (props) => {
  const { value } = props;
  return (
    <CircularProgress
      value={value}
      color={value == 100 ? "green" : "red"}
      size="40px"
      marginLeft="10px"
    >
      <CircularProgressLabel>
        {value < 100 ? `${value}%` : <CheckIcon />}
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default Progress;
