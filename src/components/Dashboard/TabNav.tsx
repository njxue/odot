import {
  TabList,
  Tab,
  Divider,
  Flex,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { TabNavContent } from "./TabNavContent";
import ITodo from "../../interface/ITodo";
import { useWindowDimensions } from "../../helpers/useWindowDimensions";
import { TaskSearch } from "./TaskSearch";

export const TabNav: React.FC<{
  todos: ITodo[];
  setIndex: (index: number) => void;
  setKeywords: (kws: string) => void;
  tabs: { [key: string]: { icon: any; color: string } };
}> = (props) => {
  const { todos, setIndex, setKeywords, tabs } = props;
  const w = useWindowDimensions().width;

  const selectedStyles = {
    borderLeft: "solid 6px #00494c",
    fontWeight: "bold",
    bg: useColorModeValue("#E7E7E7", "#283343"),
  };

  return (
    <TabList padding={1} minW="200px">
      <Tab display="none"></Tab>
      <VStack w="100%">
        <TaskSearch setIndex={setIndex} setKeywords={setKeywords} />
        <Divider borderColor="gray.400" />
        {/* ==================== Fixed tabs ============================ */}
        <Flex
          direction={w < 500 ? "row" : "column"}
          w="100%"
          flexBasis="50%"
          overflow="auto"
          borderBottom="solid 1px lightGrey"
        >
          {Object.entries(tabs).map((e) => (
            <Tab _selected={selectedStyles} key={e[0]} marginBottom={0}>
              <TabNavContent icon={e[1].icon} text={e[0]} />
            </Tab>
          ))}
        </Flex>
        {/* ==================== Created lists ============================ */}
        {todos.length > 0 && (
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
                whiteSpace="nowrap"
              >
                <TabNavContent icon={AiOutlineUnorderedList} text={t.name} />
              </Tab>
            ))}
          </Flex>
        )}
      </VStack>
    </TabList>
  );
};
