import Calendar from "../Calendar/Calendar";
import {useState} from "react";
import css from "./MonthInfo.module.css";
import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
import icons from "../../assets/icons/icons.svg";

const MonthInfo = () => {
	const [isCalendarView, setIsCalendarView] = useState(true);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [currentMonth, setCurrentMonth] = useState(new Date());

	const changeMonth = (direction) => {
		const newDate = new Date(currentMonth);
		newDate.setMonth(currentMonth.getMonth() + direction); // Change month by +1 or -1
		setCurrentMonth(newDate);
	};

	return (
		<div className={css.monthInfo}>
			<div className={css.headingPanel}>
				<h2 className={css.h2}>{isCalendarView ? 'Month' : 'Statistics'}</h2>
				<div className={css.infoNav}>
					<CalendarPagination
						selectedDate={selectedDate}
						currentMonth={currentMonth}
            handleMonthChange={changeMonth}
					/>
					<button className={css.toggleView} >
						<svg>
							<use href={`${icons}#icon-chart`}/>
						</svg>
					</button>
				</div>
			</div>
			{isCalendarView ?
				<Calendar
					currentMonth={currentMonth}
					selectedDate={selectedDate}
					changeMonth={changeMonth}
					onDateSelect={(date) => setSelectedDate(date)}
				/>
				: null
			}
		</div>
	);
};

export default MonthInfo;
