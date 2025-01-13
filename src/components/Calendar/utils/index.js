export const getMonthDates = (date) => {
	const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
	const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
	const daysInMonth = lastDay.getDate();

	const dates = [];

	for (let i = 1; i <= daysInMonth; i++) {
		dates.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), i));
	}

	return dates;
};

export const getDateBackgroundColor = (date, selectedDate, val) => {
	if (!date) return '#fff'; // Default background color if the date is invalid

	const isSelected = date.toDateString() === selectedDate.toDateString();
	const isVal100 = val === 100;

	if (isSelected) {
		return '#323F47';
	}

	return isVal100 ? '#fff' : 'rgba(50, 63, 71, 0.21)';
};

export const getDateTextColor = (date, selectedDate) => {
	if (!date) return '#323F47';
	const isSelected = date.toDateString() === selectedDate.toDateString();

	return isSelected ? '#9BE1A0' : '#323F47';
};

