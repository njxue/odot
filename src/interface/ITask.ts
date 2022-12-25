export default interface ITask {
  id: string;
  todoId: string;
  todoName: string;
  name: string;
  isCompleted: boolean;
  isImportant: boolean;
  dueDate?: Date;
}
