/* eslint-disable react/prop-types */
import styles from './Input.module.css';

export function Input({isDark, placeholder, value, onChange, className }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${styles.input} ${className} ${isDark ? styles.dark : styles.light}`}
    />
  );
}
