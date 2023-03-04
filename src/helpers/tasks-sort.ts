import ITask from "../interface/ITask";
import { isAfter } from "./date-time-calculations";

export enum SortMetric {
  DATE_ADDED = "Date Added",
  DUE_DATE = "Due Date",
  IMPORTANCE = "Importance",
}

export enum SortOrder {
  ASC = "Ascending",
  DSC = "Descending",
}

export function sortByDateAdded(tasks: ITask[]): void {
  tasks.reverse();
}

export function sortByDueDate(tasks: ITask[]): void {
  tasks.sort((t1, t2) => {
    if (t1.dueDate && t2.dueDate) {
      return isAfter(t1.dueDate, t2.dueDate) ? 1 : -1;
    }

    if (t1.dueDate) {
      return -1;
    }

    if (t2.dueDate) {
      return 1;
    }

    return 0;
  });
}

export function sortByImportance(tasks: ITask[]): void {
  tasks.sort((t1, t2) => {
    if (t1.isImportant && t2.isImportant) {
      return 0;
    }

    if (t1.isImportant) {
      return -1;
    }

    if (t2.isImportant) {
      return 1;
    }

    return 0;
  });
}

export function getSortedTasks(
  tasks: ITask[],
  metric: SortMetric,
  order: SortOrder
): ITask[] {
  const copy: ITask[] = [...tasks];
   
  switch (metric) {
    case SortMetric.DATE_ADDED: {
      sortByDateAdded(copy);
      break;
    }

    case SortMetric.DUE_DATE: {
      sortByDueDate(copy);
      break;
    }

    case SortMetric.IMPORTANCE: {
      sortByImportance(copy);
      break;
    }
  }
  if (order === SortOrder.ASC) {
    copy.reverse();
  }
  return copy;
}
