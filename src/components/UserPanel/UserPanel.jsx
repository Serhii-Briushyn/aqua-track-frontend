import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import UserBar from "../UserBar/UserBar";
import { formatName } from "../../utils/formatName";
import { selectUser } from "../../redux/auth/selectors";

import css from "./UserPanel.module.css";

const UserPanel = () => {
  const user = useSelector(selectUser);

  const { t } = useTranslation();

  const userName = formatName(user?.name, user?.email);

  return (
    <div className={css.userPanel}>
      <h1 className={css.title}>
        <span>{t("hello")}</span>, {userName}!
      </h1>
      <UserBar userName={userName} />
    </div>
  );
};

export default UserPanel;
