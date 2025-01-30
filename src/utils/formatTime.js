export const formatTimeUTC = (dateString) => {
  const dateObject = new Date(dateString);
  const hours = dateObject.getUTCHours().toString().padStart(2, "0");
  const minutes = dateObject.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
