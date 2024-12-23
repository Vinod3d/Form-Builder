/* eslint-disable react/prop-types */
import styles from './Button.module.css';

export const Button = ({ children, variant = 'primary', onClick }) => {
  return (
    <button 
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      style={{ marginTop: variant === 'google' ? '0px' : '10px' }}
    >
      {children}
    </button>
  );
};