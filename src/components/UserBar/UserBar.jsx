import UserBarPopover from "../UserBarPopover/UserBarPopover";
import css from "./UserBar.module.css";
import { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const iconStyles = { color: "#fff", fontSize: 22 };

const UserBar = ({ userName }) => {
  const temporaryAvatar = "https://www.w3schools.com/howto/img_avatar.png";

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.userBar} data-tour="step-7">
      <h2 className={css.h2}>{userName}</h2>
      <div className={css.userAvatar}>
        <img src={temporaryAvatar} alt="avatar" />
      </div>
      <button
        role="button"
        className={css.btn}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <MdOutlineKeyboardArrowUp style={iconStyles} />
        ) : (
          <MdOutlineKeyboardArrowDown style={iconStyles} />
        )}
      </button>
      {isOpen && <UserBarPopover />}
    </div>
  );
};

export default UserBar;
