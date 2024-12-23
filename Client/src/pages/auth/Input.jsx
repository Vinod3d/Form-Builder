/* eslint-disable react/prop-types */
import styles from "./Input.module.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export const Input = ({ label, type = "text", id, show, setShow, placeholder }) => {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>

        <input
          type={show ? "text" : "password"}
          id={id}
          className={styles.input}
          placeholder={placeholder}
          aria-label={label}
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
