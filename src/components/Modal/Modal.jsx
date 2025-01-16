import { useEffect } from "react";
import ReactDOM from "react-dom";

import icons from "../../assets/icons/icons.svg";

import css from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children, type }) => {
  const windowClass = `${css.window} ${
    type === "userSettings" ? css.userSettingsWindow : ""
  }`;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={css.overlay} onClick={onClose}>
      <div className={windowClass} onClick={(e) => e.stopPropagation()}>
        <button
          className={`${css.button} ${
            type === "userSettings" ? css.userSettingsButton : ""
          }`}
          onClick={onClose}
        >
          <svg className={css.icon} aria-hidden="true">
            <use href={`${icons}#icon-close`} />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
