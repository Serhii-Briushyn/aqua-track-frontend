import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import UserBarPopover from "../UserBarPopover/UserBarPopover";
import css from "./UserBar.module.css";
import { useEffect, useRef, useState } from "react";

import icons from "../../assets/icons/icons.svg";
import LogOutModal from "../LogOutModal/LogOutModal";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal";

const UserBar = ({ userName }) => {
  const user = useSelector(selectUser);
  const userBarRef = useRef(null);
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
  const [isLogOutModalOpen, setLogOutModalOpen] = useState(false);

  const getAvatarContent = () => {
    if (user && user.avatar) {
      return <img src={user.avatar} alt="avatar" />;
    }
    const initial = userName ? userName[0].toUpperCase() : "U";
    return <span className={css.initial}>{initial}</span>;
  };

  const handleTogglePopover = () => {
    setPopoverOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      userBarRef.current &&
      !userBarRef.current.contains(event.target) &&
      !event.target.closest("#modal-root")
    ) {
      setPopoverOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={css.userBar} ref={userBarRef}>
        <div className={css.container} onClick={handleTogglePopover}>
          <h2 className={css.h2}>{userName}</h2>
          <div className={css.userAvatar}>{getAvatarContent()}</div>
          <button role="button" className={css.btn}>
            <svg className={`${css.svg} ${isPopoverOpen ? css.rotated : ""}`}>
              <use href={`${icons}#icon-arrow-down`} />
            </svg>
          </button>
        </div>

        {isPopoverOpen && (
          <UserBarPopover
            onClose={() => setPopoverOpen(false)}
            onOpenSettingsModal={() => setSettingsModalOpen(true)}
            onOpenLogOutModal={() => setLogOutModalOpen(true)}
          />
        )}
      </div>

      {isSettingsModalOpen && (
        <UserSettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setSettingsModalOpen(false)}
        />
      )}
      {isLogOutModalOpen && (
        <LogOutModal
          isOpen={isLogOutModalOpen}
          onClose={() => setLogOutModalOpen(false)}
        />
      )}
    </>
  );
};
export default UserBar;
