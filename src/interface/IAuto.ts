import ITask from "./ITask";

interface IAuto extends ITask {
  freq: number;
  nextUpdate: Date;
}

export default IAuto;
