import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const TaskSearch: React.FC<{
  setIndex: (index: number) => void;
  setKeywords: (kws: string) => void;
}> = (props) => {
  const { setIndex, setKeywords } = props;
  return (
    <InputGroup>
      <Input
        padding={2}
        type="text"
        size="sm"
        onChange={(e) => {
          setIndex(0);
          setKeywords(e.target.value);
        }}
        placeholder="Find task"
      />
      <InputRightElement
        h="100%"
        pointerEvents="none"
        children={<SearchIcon color="gray.300" />}
      />
    </InputGroup>
  );
};
