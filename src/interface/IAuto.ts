import ITask from "./ITask";

interface IAuto extends ITask {
  freq: number;
  nextUpdate: Date;
  dueDate: Date;
}

export default IAuto;
