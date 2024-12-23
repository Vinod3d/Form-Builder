import { Input } from "./Input";
import { Button } from "./Button";
import styles from "./Login.module.css";
import { decorativeImg1, decorativeImg2, decorativeImg3, google } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";

export const Login = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleShow = ()=>{
      setShow(!show);
    }

  return (
    <div className={styles.loginScreen}>
        <div className={styles.backBtn} onClick={()=>navigate(-1)}>
            <Link ><FaArrowLeft className={styles.backIcon}/></Link>
        </div>
      <img
        src={decorativeImg1}
        alt="Login illustration"
        className={styles.decorativeImg1}
      />

      <img
        src={decorativeImg2}
        alt=""
        className={styles.decorativeImg2}
      />

      <img
        src={decorativeImg3}
        alt=""
        className={styles.decorativeImg3}
      /> 
      <div className={styles.content}>
            <form className={styles.loginForm}>
              <Input
                label="Email"
                type="email"
                id="email"
                placeholder="Enter your email"
              />
              <Input
                label="Password"
                type="password"
                id="password"
                show={show}
                setShow={handleShow}
                placeholder="Enter your password"
              />
              <Button className={styles.loginBtn}>Log In</Button>
              <span className={styles.divider}>OR</span>
              <Button className={styles.googleBtn} variant="google" >
                <img src={google} className={styles.googleIcon} />
                <span>Sign In with Google</span>
              </Button>
              <p className={styles.registerPrompt}>
                Don&apos;t have an account?{" "}
                <Link to="/register" className={styles.registerLink}>Register now</Link>
              </p>
            </form>
      </div>
    </div>
  );
};
