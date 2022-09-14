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
    console.log(today.getHours());
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
  if (d1 !== undefined) {
    console.log(new Date(d1) + "   vs   " + d2);
  }
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

export { calculateNextUpdateTime, isAfter };
