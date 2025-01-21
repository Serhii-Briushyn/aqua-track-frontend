export const getDateBackgroundColor = (date, selectedDate, val) => {
  if (!date || val === 100) return "#fff";

  const dateObj = date instanceof Date ? date : new Date(date);
  const selectedDateObj =
    selectedDate instanceof Date ? selectedDate : new Date(selectedDate);

  const isSelected = dateObj.toDateString() === selectedDateObj.toDateString();
  if (isSelected) {
    return "#323F47";
  }
  return `rgba(50, 63, 71, 0.20)`;
};

export const getDateTextColor = (date, selectedDate) => {
  if (!date) return "#323F47";

  const dateObj = date instanceof Date ? date : new Date(date);
  const selectedDateObj =
    selectedDate instanceof Date ? selectedDate : new Date(selectedDate);

  const isSelected = dateObj.toDateString() === selectedDateObj.toDateString();
  return isSelected ? "#9BE1A0" : "#323F47";
};
