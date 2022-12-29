import { Icon, Text } from "@chakra-ui/react";
import { AiTwotoneCalendar } from "react-icons/ai";
import {
  getDateString,
  isAfter,
  isToday,
} from "../../helpers/date-time-calculations";
import styles from "../../styles/Task.module.css";

export const DueDate: React.FC<{ dueDate: Date }> = (props) => {
  const isDue: boolean = isAfter(new Date(), new Date(props.dueDate));

  return (
    <div className={styles.dueDate}>
      <Icon color={isDue ? "red" : "black"} as={AiTwotoneCalendar} />
      <Text color={isDue ? "red" : "black"} fontSize="xs">
        {isToday(new Date(props.dueDate))
          ? "Today"
          : getDateString(new Date(props.dueDate))}
      </Text>
    </div>
  );
};
