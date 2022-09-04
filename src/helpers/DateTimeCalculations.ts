import TimeInterval from "./TimeInterval";

function calculateNextUpdateTime(time: TimeInterval) {
  if (time == TimeInterval.WEEK) {
    return getThisSunday();
  } else if (time == TimeInterval.DAY) {
    return getEndOfToday();
  } else {
    return getEndOfMonth();
  }
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

export { calculateNextUpdateTime };
