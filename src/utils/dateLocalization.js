const ukMonthsGenitive = {
  січень: "Січня",
  лютий: "Лютого",
  березень: "Березня",
  квітень: "Квітня",
  травень: "Травня",
  червень: "Червня",
  липень: "Липня",
  серпень: "Серпня",
  вересень: "Вересня",
  жовтень: "Жовтня",
  листопад: "Листопада",
  грудень: "Грудня",
};

export const getLocalizedDate = (date, language, t) => {
  const today = new Date();
  const inputDate = new Date(date);

  const isToday = today.toDateString() === inputDate.toDateString();
  if (isToday) {
    return t("today");
  }

  const day = new Intl.DateTimeFormat(language, {
    day: "numeric",
  }).format(inputDate);

  let month = new Intl.DateTimeFormat(language, {
    month: "long",
  }).format(inputDate);

  if (language === "uk" && ukMonthsGenitive[month.toLowerCase()]) {
    month = ukMonthsGenitive[month.toLowerCase()];
  }

  month = month.charAt(0).toUpperCase() + month.slice(1);

  return `${day}, ${month}`;
};
