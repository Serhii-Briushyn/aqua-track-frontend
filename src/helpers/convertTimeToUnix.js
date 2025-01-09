export const convertTimeToUnix = (timeString, day) => {
  const [hours, minutes] = timeString.split(":").map(Number);

  const date = new Date(day);
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date.getTime();
};
