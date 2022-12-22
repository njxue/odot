export default interface ITask {
  id: string;
  todoId: string;
  name: string;
  isCompleted: boolean;
  isImportant: boolean;
  dueDate?: Date;
}
