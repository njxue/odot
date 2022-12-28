import ITask from "./ITask";
import IAuto from "./IAuto";

export default interface ITodo {
  id: string;
  name: string;
  tasks?: ITask[];
  autos?: IAuto[];
}
