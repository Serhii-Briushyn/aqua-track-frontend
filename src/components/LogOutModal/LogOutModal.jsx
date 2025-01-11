import css from "./LogOutModal.module.css"
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations";

const LogOutModal = ({ isOpen, onClose }) => {
    
  const dispatch = useDispatch();

  return (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className={css.modal}>
      <div className={css.modalWrapper}>
        <div className={css.modalContent}>
          <button type="button" className={css.btnClose} onClick={onClose}>
            <svg className={css.icon} aria-hidden="true">
              <use xlinkHref="/src/assets/icons/icons.svg#icon-close" />
            </svg>
          </button>
          <h2 className={css.titleLogout}>Log out</h2>
          <p className={css.textLogout}>Do you really want to leave?</p>
          <div className={css.boxForBtn}>
            <button type="button" className={css.btnLogout} onClick={() => dispatch(logout())}>Log out</button>
            <button type="button" className={css.btnCancel} onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </Modal>

  )
}

export default LogOutModal