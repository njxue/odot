import ITask from "./ITask";

interface IAuto extends ITask {
  freq: number;
  timeOffset: string;
  nextUpdate: Date;
}

export default IAuto;
