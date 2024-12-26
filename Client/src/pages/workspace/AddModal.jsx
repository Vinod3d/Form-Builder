/* eslint-disable react/prop-types */
import styles from './addmodal.module.css';

const AddModal = ({title, placeholder, value, onChange, onAdd, onClose}) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Create a {title}</h3>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={styles.modalInput}
        />
        <div className={styles.modalActions}>
          <button onClick={onAdd} className={styles.addButton}>
            Create
          </button>
          <button
            onClick={onClose}
            className={styles.modalCancelButton}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
