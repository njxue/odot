import ITask from "./ITask";

export default interface Todo {
  id: string;
  name: string;
  tasks?: ITask[];
}
