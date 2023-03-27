import TimeInterval from "./TimeInterval";

function calculateNextUpdateTime(
  interval: TimeInterval,
  offset: string = ""
): Date {
  const o = timeToSeconds(offset);
  if (interval === TimeInterval.WEEK) {
    return new Date(getThisSunday().getTime() + o);
  } else if (interval === TimeInterval.DAY) {
    return new Date(getTomorrow().getTime() + o);
  } else if (interval === TimeInterval.SECONDS) {
    // can ignore, for testing purposes only
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
    return new Date(getNextMonth().getTime() + o);
  }
}
// Checks if d1 is after d2
function isAfter(d1: Date, d2: Date): boolean {
  return new Date(d1) > new Date(d2);
}

function getThisSunday(): Date {
  const today = new Date();
  const first = today.getDate() - today.getDay() + 1;
  const last = first + 6;
  const sunday = new Date(new Date(today.setDate(last)).setHours(0, 0, 0));
  return sunday;
}

function getTomorrow(): Date {
  const tmr = new Date();
  return new Date(new Date(tmr.setDate(tmr.getDate() + 1)).setHours(0, 0, 0));
}

function getNextMonth(): Date {
  const today = new Date();
  const mth = today.getMonth();
  const yr = today.getFullYear();
  return new Date(new Date(yr, mth + 1, 0).setHours(0, 0, 0));
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
  return `${date}/${mthStr}/${yr % 2000}`;
}

function getDateTimeString(d: Date): string {
  const date: string = d.getDate().toString().padStart(2, "0");
  const mth: number = d.getMonth() + 1;
  const mthStr: string = mth.toString().padStart(2, "0");
  const yr: number = d.getFullYear();
  const hr: number = d.getHours();
  const min: number = d.getMinutes();
  return `${yr}-${mthStr}-${date}T${hr}:${min}`;
}

function getTimeString(d: Date): string {
  const hr: number = d.getHours();
  const min: number = d.getMinutes();
  return `${hr}:${String(min).padStart(2, "0")}`;
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

function timeToSeconds(time: string): number {
  const _ = time.split(":");
  if (_.length < 2) {
    return 0;
  }
  return parseInt(_[0], 10) * 60 * 60 * 1000 + parseInt(_[1], 10) * 60 * 1000;
}

export {
  calculateNextUpdateTime,
  isAfter,
  getTimeNow,
  getDateString,
  getDateTimeString,
  getTimeString,
  isToday,
  toEndOfDay,
};
