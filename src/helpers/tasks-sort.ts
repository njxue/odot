import ITask from "../interface/ITask";
import { isAfter } from "./date-time-calculations";

export enum SORT_ORDER {
  DATE_ADDED = "Date Added",
  DUE_DATE = "Due Date",
  IMPORTANCE = "Importance",
}

export function sortByDateAdded(tasks: ITask[]): void {
  tasks.reverse()
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

export function getSortedTasks(tasks: ITask[], order: SORT_ORDER): ITask[] {
  const copy: ITask[] = [...tasks];
  switch (order) {
    case SORT_ORDER.DATE_ADDED: {
      sortByDateAdded(copy);
      return copy;
    }

    case SORT_ORDER.DUE_DATE: {
      sortByDueDate(copy);
      return copy;
    }

    case SORT_ORDER.IMPORTANCE: {
      sortByImportance(copy);
      return copy;
    }
  }
}
