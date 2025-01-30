import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import UserBarPopover from "../UserBarPopover/UserBarPopover";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal.jsx";
import LogOutModal from "../LogOutModal/LogOutModal.jsx";

import { selectUser } from "../../redux/auth/selectors";

import icons from "../../assets/icons/icons.svg";

import css from "./UserBar.module.css";

const UserBar = ({ userName }) => {
  const user = useSelector(selectUser);
  const userBarRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  const getAvatarContent = () => {
    if (user?.avatar) {
      return <img src={user.avatar} alt="avatar" />;
    }

    const initial = userName ? userName[0].toUpperCase() : "U";
    return <span className={css.initial}>{initial}</span>;
  };

  const handleToggle = useCallback((e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  const closeSettingsModal = useCallback(() => {
    setIsSettingsModalOpen(false);
  }, []);

  const closeLogOutModal = useCallback(() => {
    setIsLogOutModalOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userBarRef.current && !userBarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className={css.relativeContainer} ref={userBarRef}>
        <div className={css.userBar} onClick={handleToggle}>
          <h2 className={css.subtitle}>{userName}</h2>
          <div className={css.userAvatar}>{getAvatarContent()}</div>
          <button role="button" className={css.button}>
            <svg className={`${css.icon} ${isOpen ? css.rotated : ""}`}>
              <use href={`${icons}#icon-arrow-down`} />
            </svg>
          </button>
        </div>
        {isOpen && (
          <UserBarPopover
            onSettingsClick={() => setIsSettingsModalOpen(true)}
            onLogOutClick={() => setIsLogOutModalOpen(true)}
          />
        )}
      </div>
      <UserSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={closeSettingsModal}
      />
      <LogOutModal isOpen={isLogOutModalOpen} onClose={closeLogOutModal} />
    </>
  );
};

export default UserBar;
