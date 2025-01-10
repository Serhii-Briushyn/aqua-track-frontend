import css from "./LogOutModal.module.css"
import Modal from "../Modal/Modal";

const LogOutModal = ({isOpen, onClose}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <div className={css.modal}>
      <div className={css.modalWrapper}>
        <div className={css.modalContent}>
          <button className={css.btnClose} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#2F2F2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="#2F2F2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h2 className={css.titleLogout}>Log out</h2>
          <p className={css.textLogout}>Do you really want to leave?</p>
          <div className={css.boxForBtn}>
            <button className={css.btnLogout}>Log out</button>
            <button className={css.btnCancel} onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
    </Modal>

  )
}

export default LogOutModal