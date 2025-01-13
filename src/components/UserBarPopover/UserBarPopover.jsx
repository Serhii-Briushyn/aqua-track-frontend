import LogOutModal from "../LogOutModal/LogOutModal";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal";
import icons from "../../assets/icons/icons.svg";
import css from "./UserBarPopover.module.css";
import { useState } from "react";
import React from "react";
import Modal from "react-modal";
import { CgClose } from "react-icons/cg";

Modal.setAppElement("#root");

const MainModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
      shouldCloseOnOverlayClick={true}
    >
      <button className={css.closeBtn} onClick={onRequestClose}>
        <svg className={css.closeBtnSvg}>
          <use href={`${svg}#icon-close-btn`} />
        </svg>
      </button>
      {children}
    </Modal>
  );
};

const BaseModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
      shouldCloseOnOverlayClick={true}
    >
      <div className={css.info}>
        <button type="button" className={css.btn} onClick={onRequestClose}>
          <CgClose className={css.svg} />
        </button>
        {children}
      </div>
    </Modal>
  );
};

export default function UserBarPopover({
  style,
  isOpenSettingsModal,
  openSettingsModal,
  closeSettingsModal,
  isOpenLogOutModal,
  openLogOutModal,
  closeLogOutModal,
}) {
  return (
    <div className={css.wrapper} style={style}>
      <button className={css.btnSet} type="button" onClick={openSettingsModal}>
        <div className={css.wrapIcon}>
          <svg className={css.icon} aria-hidden="true" id="settings">
            <use xlinkHref="/src/assets/icons/icons.svg#icon-close-btn" />
          </svg>
        </div>
        Settings
      </button>
      <button className={css.btnLogOut} type="button" onClick={openLogOutModal}>
        <div className={css.wrapIcon}>
          <svg className={css.iconLog} aria-hidden="true" id="log-out">
            <use xlinkHref="/src/assets/icons/icons.svg#icon-close" />
          </svg>
        </div>
        Log Out
      </button>
      <MainModal
        isOpen={isOpenSettingsModal}
        onRequestClose={closeSettingsModal}
      >
        <UserSettingsModal onRequestClose={closeSettingsModal} />
      </MainModal>
      <BaseModal isOpen={isOpenLogOutModal} onRequestClose={closeLogOutModal}>
        <LogOutModal onRequestClose={closeLogOutModal} />
      </BaseModal>
    </div>
  );
}
