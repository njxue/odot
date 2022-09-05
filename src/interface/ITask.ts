export default interface ITask {
  id: string;
  todoId: string;
  name: string;
  isAuto: boolean;
  nextUpdate?: Date;
}
