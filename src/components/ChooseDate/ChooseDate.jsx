import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { selectCurrentDate } from "../../redux/water/selectors";
import { getLocalizedDate } from "../../utils/dateLocalization";

import css from "./ChooseDate.module.css";

const ChooseDate = () => {
  const { t, i18n } = useTranslation();
  const currentDate = useSelector(selectCurrentDate);

  return (
    <p className={css.date}>
      {getLocalizedDate(currentDate, i18n.language, t)}
    </p>
  );
};

export default ChooseDate;
