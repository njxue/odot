import { TabList, Tab, Divider, Flex, VStack } from "@chakra-ui/react";

import { RiArchiveDrawerFill } from "react-icons/ri";
import { AiOutlineUnorderedList, AiOutlineFieldTime } from "react-icons/ai";
import { MdOutlineCalendarToday } from "react-icons/md";
import { TbListDetails } from "react-icons/tb";
import { CheckIcon, StarIcon } from "@chakra-ui/icons";

import { TabNavContent } from "./TabNavContent";
import ITodo from "../../interface/ITodo";
import { useWindowDimensions } from "../../helpers/useWindowDimensions";
import { TaskSearch } from "./TaskSearch";

export const TabNav: React.FC<{
  todos: ITodo[];
  setIndex: (index: number) => void;
  setKeywords: (kws: string) => void;
}> = (props) => {
  const { todos, setIndex, setKeywords } = props;
  const w = useWindowDimensions().width;

  const selectedStyles = {
    borderLeft: "solid 6px #00494c",
    fontWeight: "bold",
    bg: "#F2F2F2",
  };

  const tabs = {
    Organised: RiArchiveDrawerFill,
    All: TbListDetails,
    Important: StarIcon,
    Today: MdOutlineCalendarToday,
    Completed: CheckIcon,
    Overdue: AiOutlineFieldTime,
  };

  return (
    <TabList w="100%" padding={1} flexBasis="200px" minW="200px">
      <Tab display="none"></Tab>
      <VStack w="100%">
        <TaskSearch setIndex={setIndex} setKeywords={setKeywords} />
        <Divider borderColor="gray.400" />
        <Flex
          direction={w < 500 ? "row" : "column"}
          w="100%"
          flexBasis="50%"
          overflow="auto"
          borderBottom="solid 1px lightGrey"
        >
          {Object.entries(tabs).map((e) => (
            <Tab _selected={selectedStyles} key={e[0]} marginBottom={0}>
              <TabNavContent icon={e[1]} text={e[0]} />
            </Tab>
          ))}
        </Flex>

        <Flex
          direction={w < 500 ? "row" : "column"}
          overflow="auto"
          alignItems="center"
          w="100%"
          flexBasis="50%"
        >
          {todos.map((t) => (
            <Tab
              w="100%"
              _selected={selectedStyles}
              key={t.id}
              marginBottom={0}
            >
              <TabNavContent icon={AiOutlineUnorderedList} text={t.name} />
            </Tab>
          ))}
        </Flex>
      </VStack>
    </TabList>
  );
};
