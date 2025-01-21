import { useSelector } from "react-redux";
import UserBar from "../UserBar/UserBar";
import css from "./UserPanel.module.css";
import { selectUser } from "../../redux/auth/selectors";

const UserPanel = () => {
  const user = useSelector(selectUser);

  const getTrimmedName = (name, email) => {
    if (name) {
      const firstName = name.split(" ")[0];

      return firstName.length > 10 ? `${firstName.slice(0, 10)}...` : firstName;
    } else if (email) {
      const emailPrefix = email.split("@")[0];

      return emailPrefix.length > 10
        ? `${emailPrefix.slice(0, 10)}...`
        : emailPrefix;
    }

    return "User";
  };

  const trimmedName = getTrimmedName(user?.name, user?.email);

  return (
    <div className={css.userPanel}>
      <h1 className={css.h1}>
        <span>Hello</span>, {trimmedName}!
      </h1>
      <UserBar userName={trimmedName} />
    </div>
  );
};

export default UserPanel;
