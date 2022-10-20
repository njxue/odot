import { useEffect, useState } from "react";
import ITask from "../../interface/ITask";
import Todo from "../../interface/Todo";

interface TodoListProps {
  todos: Todo[];
}

const TodoList: React.FC<TodoListProps> = (props) => {
  const { todos } = props;
  const [incompleteTasks, setIncompleteTasks] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const incompleteTasksTmp: ITask[] = [];
    const completedTasksTmp: ITask[] = [];

    todos.map((todo) => {
      if (todo.tasks) {
        for (const k in todo.tasks) {
          const task: ITask = todo.tasks[k];
          if (task.isCompleted) {
            completedTasks.push(task);
          } else {
            incompleteTasks.push(task);
          }
        }
      }
    });
    console.log(incompleteTasks);
    setIncompleteTasks(incompleteTasksTmp);
    setCompletedTasks(completedTasksTmp);
  }, [todos]);

  useEffect(() => {
    console.log(incompleteTasks.length);
  }, [incompleteTasks]);

  return (
    <>
      {incompleteTasks.map((task) => (
        <p>{task.name}</p>
      ))}
    </>
  );
};

export default TodoList;
