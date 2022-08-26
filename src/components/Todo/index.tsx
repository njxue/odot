import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import Todo from "../../interface/Todo";

interface TodoProps {
  todo: Todo;
}

export const TodoMenu: React.FC<TodoProps> = (props) => {
  const todo: Todo = props.todo;
  return (
    <Accordion allowMultiple allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            {todo.name}
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>foo bar baz</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
