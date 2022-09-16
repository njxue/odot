enum TimeInterval {
  DAY,
  WEEK,
  MONTH,
  SECONDS,
}

export function intervalToFreq(interval: TimeInterval): number {
  switch (interval) {
    case TimeInterval.DAY:
      return 0;
    case TimeInterval.WEEK:
      return 1;
    case TimeInterval.MONTH:
      return 2;
    case TimeInterval.SECONDS:
      return 3;
  }
}
export default TimeInterval;
