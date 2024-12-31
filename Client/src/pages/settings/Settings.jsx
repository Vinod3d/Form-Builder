import { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './settings.module.css'
import { BsPersonFill } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdLock } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, clearMessage, logout, updateUser } from '../../store/slice/userSlice';
import { toast } from 'react-toastify';

export default function Settings() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, error, message } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: user ? user.user.name : '',
    email: user ? user.user.email : '',
    oldPassword: '',
    newPassword: ''
  });
  
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [errors, setErrors] = useState({ oldPassword: '', newPassword: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.oldPassword || formData.newPassword) {
        if (!formData.oldPassword || !formData.newPassword) {
          setErrors({
            oldPassword: formData.oldPassword ? '' : 'Old Password is required',
            newPassword: formData.newPassword ? '' : 'New Password is required'
          });
          return;
        }
    }

    dispatch(updateUser(formData))
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(()=>{
    if(error){
        toast.error(error);
        clearErrors();
    }
    if(message){
        toast.success(message);
        clearMessage()
    }
  },[dispatch, error, message]);

  return (
    <div className={styles.container}>
        <div className={styles.backBtn} onClick={() => navigate(-1)}>
            <Link>
                <FaArrowLeft className={styles.backIcon} />
            </Link>
        </div>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Settings</h1>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
          <BsPersonFill className={styles.inputIcon}/>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
          <MdOutlineMailOutline className={styles.inputIcon}/>
            <input
              type="email"
              name="email"
              placeholder="Update Email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
          <MdLock className={styles.inputIcon}/>
            <input
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              placeholder="Old Password"
              value={formData.oldPassword}
              onChange={handleChange}
              className={styles.input}
            />
            <div 
              className={styles.toggleIcon}
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {errors.oldPassword && <p className={styles.error}>{errors.oldPassword}</p>}

          <div className={styles.inputGroup}>
          <MdLock className={styles.inputIcon}/>
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className={styles.input}
            />
            <div 
              className={styles.toggleIcon}
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {errors.newPassword && <p className={styles.error}>{errors.newPassword}</p>}

          <button type="submit" className={styles.updateButton}>
            Update
          </button>
        </form>

        <button onClick={handleLogout} className={styles.logoutButton}>
        <TbLogout style={{fontSize:'25px'}}/>  Log out
        </button>
      </div>
    </div>
  );
}

