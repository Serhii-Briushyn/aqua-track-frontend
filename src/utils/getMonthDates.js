export const getMonthDates = (year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => ({
    date: new Date(year, month, i + 1).toISOString().slice(0, 10),
  }));
};
