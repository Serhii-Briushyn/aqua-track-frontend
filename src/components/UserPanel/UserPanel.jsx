import UserBar from "../UserBar/UserBar";
import css from "./UserPanel.module.css";

const UserPanel = ({ user }) => {
  return (
    <div className={css.userPanel}>
      <h1 className={css.h1}>
        <span>Hello</span>, {user?.name || 'User Name'}!
      </h1>
      <UserBar userName={user?.name || 'User Name'} />
    </div>
  );
};

export default UserPanel;
