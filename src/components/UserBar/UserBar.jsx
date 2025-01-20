import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import UserBarPopover from "../UserBarPopover/UserBarPopover";
import css from "./UserBar.module.css";
import { useState, useEffect, useRef } from "react";
import icons from "../../assets/icons/icons.svg";

const UserBar = ({ userName }) => {
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const userBarRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userBarRef.current && !userBarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={css.userBar} ref={userBarRef}>
      <div className={css.container} onClick={handleToggle}>
        <h2 className={css.h2}>{userName}</h2>
        <div className={css.userAvatar}>{getAvatarContent()}</div>
        <button role="button" className={css.btn}>
          <svg className={`${css.svg} ${isOpen ? css.rotated : ""}`}>
            <use href={`${icons}#icon-arrow-down`}/>
          </svg>
        </button>
      </div>

      {isOpen && <UserBarPopover/>}
    </div>
  );
};

export default UserBar;
