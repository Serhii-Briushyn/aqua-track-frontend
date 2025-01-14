import { useEffect, useState } from 'react';
import { getDateBackgroundColor, getDateTextColor, getMonthDates } from './utils/index.js';
import css from './Calendar.module.css';

const Calendar = ({ currentMonth, selectedDate, onDateSelect }) => {
	const [monthValues, setMonthValues] = useState([]);

	const monthDates = getMonthDates(currentMonth);

	useEffect(() => {
		const newValues = monthDates.map(() => Math.floor(Math.random() * 7) + 94);
		setMonthValues(newValues);
	}, [currentMonth]);

	const handleDateClick = (date) => {
		if (onDateSelect) {
			onDateSelect(date); // Notify parent of the selected date
		}
	};

	return (
		<div className={css.calendar}>
			{monthDates.map((date, index) => {
				const val = monthValues[index]; // Get the corresponding fake value for the date
				return (
					<div key={date} className={css.dateContainer}>
						<div
							className={css.date}
							style={{
								backgroundColor: getDateBackgroundColor(date, selectedDate, val),
								color: getDateTextColor(date, selectedDate, val),
							}}
							onClick={() => handleDateClick(date)}
						>
							<div className={css.dateVal}>{date?.getDate()}</div>
						</div>
						<span className={css.val}>{val}%</span>
					</div>
				);
			})}
		</div>
	);
};

export default Calendar;
