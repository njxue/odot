import { Icon, Text, VStack } from "@chakra-ui/react";
import { AiTwotoneCalendar } from "react-icons/ai";
import {
  getDateString,
  getTimeString,
  isAfter,
  isToday,
} from "../../helpers/date-time-calculations";
import styles from "../../styles/Task.module.css";

export const DueDate: React.FC<{ dueDate: Date }> = (props) => {
  const isDue: boolean = isAfter(new Date(), new Date(props.dueDate));

  return (
    <div className={styles.dueDate}>
      <Icon color={isDue ? "red" : "auto"} as={AiTwotoneCalendar} />
      <VStack align="start" gap={0}>
        <Text color={isDue ? "red" : "auto"} fontSize="xs">
          {isToday(new Date(props.dueDate))
            ? "Today"
            : getDateString(new Date(props.dueDate)) +
              ", " +
              getTimeString(new Date(props.dueDate))}
        </Text>
      </VStack>
    </div>
  );
};
