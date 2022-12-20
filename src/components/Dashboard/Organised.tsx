import { AddModule } from "./AddModule";
import { ref, onValue } from "firebase/database";
import { db } from "../../config/firebase";
import useAuth from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import Todo from "../../interface/Todo";
import { TodoMenu } from "../Todo";
import dashboardStyles from "../../styles/Dashboard.module.css";
import { Accordion, Heading } from "@chakra-ui/react";
import Loader from "../layout/Loader";

export const Organised: React.FC<{todos: Todo[]}> = (props) => {
  return  (
    <div className={dashboardStyles.menuPane}>
      <div className={dashboardStyles.list}>
        <Accordion allowMultiple allowToggle>
          {props.todos.map((todo) => (
            <TodoMenu todo={todo} key={todo.id} />
          ))}
        </Accordion>
      </div>
      <div className={dashboardStyles.addTodo}>
        <AddModule />
      </div>
    </div>
  );
};
