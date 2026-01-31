export function getTimeZone(date: Date) {
  const offset = date.getTimezoneOffset();
  const hour = Math.trunc(-offset / 60);
  const minutes = -offset % 60;
  if (offset < 0) {
    return `+${hour}:${minutes}`;
  }
  if (offset > 0) {
    return `-${hour}:${minutes}`;
  }
  return "";
}


function secondsToReadable(seconds: number) {
  const units = {
    Day: 60 * 60 * 24,
    Hour: 60 * 60,
    Minute: 60
  };

  for (const [unit, second] of Object.entries(units)) {
    let result = Math.floor(seconds / second);
    if (result != 0) {
      if (result == 1) {
        return `${result} ${unit}`
      } else {
        return `${result} ${unit}s`
      }
    }
  }
  return `${seconds} Seconds`
}

export function toApproxUnit(date: Date) {
  const timeNow = new Date();
  const timePassed = Math.floor((timeNow.getTime() - date.getTime()) / 1000);
  return secondsToReadable(timePassed);
}