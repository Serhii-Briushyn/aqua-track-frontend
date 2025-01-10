import css from "./DeleteWaterModal.module.css"

const DeleteWaterModal = () => {
  return (
    <div className={css.modal}>
      <div className={css.modalWrapper}>
        <div className={css.modalContent}>
          <button className={css.btnClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#2F2F2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="#2F2F2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h2 className={css.titleDelete}>Delete entry</h2>   
          <p className={css.textDelete}>Are you sure you want to delete the entry?</p>
          <div className={css.boxForBtn}>
            <button className={css.btnDelete}>Delete</button>
            <button className={css.btnCancel}>Cancel</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DeleteWaterModal