import UserBar from "../UserBar/UserBar";
import css from "./UserPanel.module.css";

const UserPanel = () => {
  return (
    <div className={css.userPanel}>
      <h1 className={css.h1}>
        <span>Hello</span>, Nadia!
      </h1>
      <UserBar />
    </div>
  );
};

export default UserPanel;
