import {getDateBackgroundColor, getDateTextColor, getMonthDates} from './utils/index.js';
import css from './Calendar.module.css';

const Calendar = ({currentMonth, selectedDate, onDateSelect, monthValues}) => {

	const monthDates = getMonthDates(currentMonth);

	const handleDateClick = (date) => {
		if (onDateSelect) {
			onDateSelect(date);
		}
	};

	return (
		<div className={css.calendar}>
			{monthDates.map((date, index) => {
				const val = monthValues[index] ? monthValues[index].percentage : 0;
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
						<span className={css.val}>{val >= 100 ? '100' : Math.round(val)}%</span>
					</div>
				);
			})}
		</div>
	);
};

export default Calendar;
