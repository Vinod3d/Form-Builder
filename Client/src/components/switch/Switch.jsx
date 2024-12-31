/* eslint-disable react/prop-types */
import styles from './Switch.module.css';

export function Switch({ checked, onCheckedChange }) {
  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} />
      <span className={styles.slider}></span>
    </label>
  );
}
