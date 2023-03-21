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
import { darkPrimary, lightPrimary } from "../../styles/global-colours";
import { mobileViewWidth } from "../../helpers/global-constants";

export const TabNav: React.FC<{
  todos: ITodo[];
  setIndex: (index: number) => void;
  setKeywords: (kws: string) => void;
  tabs: { [key: string]: { icon: any; color: string } };
}> = (props) => {
  const { todos, setIndex, setKeywords, tabs } = props;
  const w = useWindowDimensions().width;

  return (
    <TabList
      padding={1}
      minW="200px"
      bg={useColorModeValue(lightPrimary, darkPrimary)}
    >
      <Tab display="none"></Tab>
      <VStack w="100%">
        <TaskSearch setIndex={setIndex} setKeywords={setKeywords} />
        <Divider borderColor="gray.400" />
        {/* ==================== Fixed tabs ============================ */}
        <Flex
          direction={w < mobileViewWidth ? "row" : "column"}
          w="100%"
          flexBasis="50%"
          overflow="auto"
        >
          {Object.entries(tabs).map((e) => (
            <Tab key={e[0]} marginBottom={0}>
              <TabNavContent icon={e[1].icon} text={e[0]} />
            </Tab>
          ))}
        </Flex>
        {todos.length > 0 && <Divider orientation="horizontal" />}
        {/* ==================== Created lists ============================ */}
        {todos.length > 0 && (
          <Flex
            direction={w < mobileViewWidth ? "row" : "column"}
            overflow="auto"
            alignItems="center"
            w="100%"
            flexBasis="50%"
          >
            {todos.map((t) => (
              <Tab w="100%" key={t.id} marginBottom={0} whiteSpace="nowrap">
                <TabNavContent icon={AiOutlineUnorderedList} text={t.name} />
              </Tab>
            ))}
          </Flex>
        )}
      </VStack>
    </TabList>
  );
};
