import Modal from "../Modal/Modal";

const ExempleModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2>Delete entry</h2>
        <p>Are you sure you want to delete the entry?</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
};

export default ExempleModal;
