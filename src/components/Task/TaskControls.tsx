import { ChevronDownIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  Divider,
} from "@chakra-ui/react";
import RemoveTaskButton from "./RemoveTaskButton";
import ToggleImportance from "./ToggleImportance";
import styles from "../../styles/Task.module.css";
import ITask from "../../interface/ITask";
import { useWindowDimensions } from "../../helpers/useWindowDimensions";
import { HiOutlineDotsVertical } from "react-icons/hi";

export const TaskControls: React.FC<{
  task: ITask;
  setIsEditing: (arg: boolean) => void;
}> = (props) => {
  const { task, setIsEditing } = props;
  const { width } = useWindowDimensions();
  return width > 500 ? (
    <div className={styles.controls}>
      <ToggleImportance task={task} disabled={task.isCompleted} />
      <RemoveTaskButton task={task} />
      <Tooltip label="Edit">
        <EditIcon cursor="pointer" onClick={() => setIsEditing(true)} />
      </Tooltip>
    </div>
  ) : (
    <HStack alignItems="center">
      <ToggleImportance task={task} disabled={task.isCompleted} />
      <Menu>
        <MenuButton>
          <ChevronDownIcon />
        </MenuButton>

        <MenuList minW="0">
          <MenuItem bg="transparent">
            <HStack>
              <RemoveTaskButton task={task} />
              <Divider borderColor="gray" h={5} orientation="vertical" />
              <EditIcon cursor="pointer" onClick={() => setIsEditing(true)} />
            </HStack>
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};
