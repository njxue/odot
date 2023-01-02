import TimeInterval from "./TimeInterval";

function calculateNextUpdateTime(time: TimeInterval): Date {
  if (time === TimeInterval.WEEK) {
    return getThisSunday();
  } else if (time === TimeInterval.DAY) {
    return getEndOfToday();
  } else if (time === TimeInterval.SECONDS) {
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
// Checks if d2 is after d1
function isAfter(d1: Date, d2: Date): boolean {
  return new Date(d1) > new Date(d2);
}

function getThisSunday(): Date {
  const today = new Date();
  const first = today.getDate() - today.getDay() + 1;
  const last = first + 6;
  const sunday = toEndOfDay(new Date(today.setDate(last)));
  return sunday;
}

function getEndOfToday(): Date {
  const today = new Date();
  return toEndOfDay(today);
}

function getEndOfMonth(): Date {
  const today = new Date();
  const mth = today.getMonth();
  const yr = today.getFullYear();
  return toEndOfDay(new Date(yr, mth + 1, 0));
}

function getTimeNow(): Date {
  return new Date();
}

// Returns string representation of the date in the following format: YYYY-MM-DD
function getDateString(d: Date): string {
  const date: string = d.getDate().toString().padStart(2, "0");
  const mth: number = d.getMonth() + 1;
  const mthStr: string = mth.toString().padStart(2, "0");
  const yr: number = d.getFullYear();
  return `${yr}-${mthStr}-${date}`;
}

function isToday(d: Date): boolean {
  const today: Date = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

function toEndOfDay(d: Date): Date {
  return new Date(d.setHours(23, 59, 59));
}

export {
  calculateNextUpdateTime,
  isAfter,
  getTimeNow,
  getDateString,
  isToday,
  toEndOfDay,
};
