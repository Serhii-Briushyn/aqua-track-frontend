import Calendar from "../Calendar/Calendar";
import {useState} from "react";
import css from "./MonthInfo.module.css";
import CalendarPagination from "../CalendarPagination/CalendarPagination.jsx";
import icons from "../../assets/icons/icons.svg";
import Chart from "../Chart/Chart.jsx";

const MonthInfo = ({ monthlyData, selectedDate, currentMonth, onChangeMonth, onChangeDate }) => {
	const [isCalendarView, setIsCalendarView] = useState(true);

	return (
		<div className={css.monthInfo}>
			<div className={css.headingPanel}>
				<h2 className={css.h2}>{isCalendarView ? 'Month' : 'Statistics'}</h2>
				<div className={css.infoNav}>
					<CalendarPagination
						selectedDate={selectedDate}
						currentMonth={currentMonth}
						handleMonthChange={onChangeMonth}
					/>
					<button
						className={css.toggleView}
						onClick={() => setIsCalendarView(!isCalendarView)}
					>
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
					changeMonth={onChangeMonth}
					monthValues={monthlyData}
					onDateSelect={(date) => onChangeDate(date)}
				/>
				:
				<Chart data={monthlyData} />
			}
		</div>
	);
};

export default MonthInfo;
