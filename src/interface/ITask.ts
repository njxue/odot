import TimeInterval from "../helpers/TimeInterval";

export default interface ITask {
  id: string;
  todoId: string;
  name: string;
  isAuto: boolean;
  isCompleted: boolean;
}
