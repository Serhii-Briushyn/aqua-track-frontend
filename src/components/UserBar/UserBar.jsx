import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import UserBarPopover from "../UserBarPopover/UserBarPopover";
import css from "./UserBar.module.css";
import { useState } from "react";

import icons from "../../assets/icons/icons.svg";

const UserBar = ({ userName }) => {
  const user = useSelector(selectUser);

  const [isOpen, setIsOpen] = useState(false);

  const getAvatarContent = () => {
    if (user?.avatar) {
      return <img src={user.avatar} alt="avatar" />;
    }

    const initial = userName ? userName[0].toUpperCase() : "U";
    return <span className={css.initial}>{initial}</span>;
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={css.userBar}>
      <h2 className={css.h2}>{userName}</h2>
      <div className={css.userAvatar}>{getAvatarContent()}</div>
      <button role="button" className={css.btn} onClick={handleToggle}>
        <svg className={`${css.svg} ${isOpen ? css.rotated : ""}`}>
          <use href={`${icons}#icon-arrow-down`} />
        </svg>
      </button>
      {isOpen && (
        <>
          <UserBarPopover onClose={handleClose} />
        </>
      )}
    </div>
  );
};

export default UserBar;
