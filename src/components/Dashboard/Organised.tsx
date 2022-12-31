import ITodo from "../../interface/ITodo";
import { TodoMenu } from "../Todo";
import { Accordion } from "@chakra-ui/react";

export const Organised: React.FC<{ todos: ITodo[] }> = (props) => {
  return (
    <Accordion allowMultiple allowToggle overflow="auto">
      {props.todos.map((todo) => (
        <TodoMenu todo={todo} key={todo.id} />
      ))}
    </Accordion>
  );
};
