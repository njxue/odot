import ITask from "./ITask";

interface IAuto extends ITask {
  freq: number;
  nextUpdate: Date;
  isPushed: boolean;
}

export default IAuto;
