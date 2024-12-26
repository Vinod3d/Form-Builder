/* eslint-disable react/prop-types */
import styles from "./Input.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const Input = ({ label, type = "text", id, name, value, onChange, show, setShow, placeholder }) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>

        <input
          type={type === "password" && show ? "text" : type}
          id={id}
          name={name}
          value={value} // Bind the value to input
          onChange={onChange}
          className={styles.input}
          placeholder={placeholder}
          aria-label={label}
          required
        />
        {type === "password" && (
        <span className={styles.icon} onClick={()=>setShow()}>
          {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      )}
      </div>

      
    </div>
  );
};
