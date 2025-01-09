import { useEffect } from "react";

import css from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.window} onClick={(e) => e.stopPropagation()}>
        <button className={css.button} onClick={onClose}>
          <svg className={css.icon} aria-hidden="true">
            <use xlinkHref="/src/assets/icons/icons.svg#icon-close" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
