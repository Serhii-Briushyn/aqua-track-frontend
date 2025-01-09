import LogOutModal from "../LogOutModal/LogOutModal";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal";
import css from "./UserBarPopover.module.css";
const UserBarPopover = () => {
  return (
    <div className={css.userBarPopover}>
        <ul>
            <li>
                <button
                    className={css.setting}
                    onClick={() => {}}
                >Setting
                </button>
            </li>
            <li>
                <button
                    className={css.logout}
                    onClick={() => {}}
                >
                    Log out
                </button>
            </li>
        </ul>
        {/*<UserSettingsModal />*/}
        {/*<LogOutModal />*/}
    </div>
  );
};

export default UserBarPopover;
