import Todo from "../../interface/Todo";
import { TodoMenu } from "../Todo";
import { Accordion } from "@chakra-ui/react";

export const Organised: React.FC<{ todos: Todo[] }> = (props) => {
  return (
    <Accordion allowMultiple allowToggle overflow="scroll">
      {props.todos.map((todo) => (
        <TodoMenu todo={todo} key={todo.id} />
      ))}
    </Accordion>
  );
};
