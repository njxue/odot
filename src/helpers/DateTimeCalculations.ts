import { NodeWithTypeArguments } from "typescript";
import TimeInterval from "./TimeInterval";

function calculateNextUpdateTime(time: TimeInterval | undefined) {
  if (time == undefined) {
    // TODO
    throw Error;
  }
  if (time == TimeInterval.WEEK) {
    return getThisSunday();
  } else if (time == TimeInterval.DAY) {
    return getEndOfToday();
  } else if (time == TimeInterval.SECONDS) {
    const today = new Date();
    const newDate = new Date(
      today.setHours(
        today.getHours(),
        today.getMinutes(),
        today.getSeconds() + 5
      )
    );
    return newDate;
  } else {
    return getEndOfMonth();
  }
}

function isAfter(d1: Date | undefined, d2: Date): boolean {
  return d1 == undefined || new Date(d1) > d2;
}

function getThisSunday(): Date {
  const today = new Date();
  const first = today.getDate() - today.getDay() + 1;
  const last = first + 6;
  const sunday = new Date(new Date(today.setDate(last)).setHours(23, 59, 59));
  return sunday;
}

function getEndOfToday(): Date {
  const today = new Date();
  return new Date(today.setHours(23, 59, 59));
}

function getEndOfMonth(): Date {
  const today = new Date();
  const mth = today.getMonth();
  const yr = today.getFullYear();
  return new Date(new Date(yr, mth + 1, 0).setHours(23, 59, 59));
}

function getTimeNow(): Date {
  return new Date();
}

function getDateString(d: Date): string {
  const date: number = d.getDate();
  const mth: number = d.getMonth() + 1;
  const yr: number = d.getFullYear();
  return yr + "-" + mth + "-" + date;
}

function isToday(d: Date): boolean {
  const today: Date = new Date();
  return (
    d.getDate() == today.getDate() &&
    d.getMonth() == today.getMonth() &&
    d.getFullYear() == today.getFullYear()
  );
}
export { calculateNextUpdateTime, isAfter, getTimeNow, getDateString, isToday };
