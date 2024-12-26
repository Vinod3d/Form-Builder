import { Input } from "./Input";
import { Button } from "./Button";
import styles from "./Login.module.css";
import { decorativeImg1, decorativeImg2, decorativeImg3, google } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, clearMessage, loginUser } from "../../store/slice/userSlice.js";
import { toast } from "react-toastify";

export const Login = () => {
  const dispatch = useDispatch();

  const {loading, error, message, isAuthenticated} = useSelector((state)=>state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => {
    setShow(!show);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };


  useEffect(() => {
    if (isAuthenticated) {
        navigate('/');
    }
    if (error) {
        toast.error(error);
        dispatch(clearErrors());
    }
    if (message) {
        toast.success(message);
        navigate('/');
        dispatch(clearMessage());
    }
}, [error, message, navigate, dispatch, isAuthenticated]);

  return (
    <div className={styles.loginScreen}>
      <div className={styles.backBtn} onClick={() => navigate(-1)}>
        <Link>
          <FaArrowLeft className={styles.backIcon} />
        </Link>
      </div>
      <img
        src={decorativeImg1}
        alt="Login illustration"
        className={styles.decorativeImg1}
      />
      <img src={decorativeImg2} alt="" className={styles.decorativeImg2} />
      <img src={decorativeImg3} alt="" className={styles.decorativeImg3} />
      <div className={styles.content}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            label="Password"
            type={show ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            show={show}
            setShow={handleShow}
          />
          <Button className={styles.loginBtn} type="submit">
            {loading ? 'logging' : 'Login'}
          </Button>
          <span className={styles.divider}>OR</span>
          <Button className={styles.googleBtn} variant="google">
            <img src={google} className={styles.googleIcon} />
            <span>Sign In with Google</span>
          </Button>
          <p className={styles.registerPrompt}>
            Don&apos;t have an account?{" "}
            <Link to="/register" className={styles.registerLink}>
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
