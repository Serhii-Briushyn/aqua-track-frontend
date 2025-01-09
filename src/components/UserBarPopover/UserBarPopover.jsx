import LogOutModal from "../LogOutModal/LogOutModal";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal";
import { FiSettings, FiLogOut } from "react-icons/fi";

import css from "./UserBarPopover.module.css";

const UserBarPopover = () => {
  return (
    <div className={css.userBarPopover}>
        <ul>
            <li>
                <button
                    className={css.setting}
                    onClick={() => {}}
                >
                    <FiSettings />
                    <span className={css.btnTxt}>Setting</span>
                </button>
            </li>
            <li>
                <button
                    className={css.logout}
                    onClick={() => {}}
                >
                    <FiLogOut />
                    <span className={css.btnTxt}>Log out</span>
                </button>
            </li>
        </ul>
        {/*<UserSettingsModal />*/}
        {/*<LogOutModal />*/}
    </div>
  );
};

export default UserBarPopover;
