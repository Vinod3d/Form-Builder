import { Link } from 'react-router-dom';
import { logo } from '../../assets';
import styles from './Header.module.css';
import { useSelector } from 'react-redux';

export const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const getFirstName = (fullName) => {
    if (fullName) {
      return fullName.split(' ')[0];
    }
    return '';
  };

  return (
    <header className={styles.headerMainNavigation}>
      <div className={styles.brandContainer}>
        <Link to="/" className={styles.brandLink}>
          <img
            loading="lazy"
            src={logo}
            className={styles.brandLogo}
            alt="FormBot Logo"
          />
          <span className={styles.brandName}>FormBot</span>
        </Link>
      </div>
      <nav className={styles.navigation}>
        {isAuthenticated ? (
          <span className={styles.signInButton}>Hey! {getFirstName(user?.user.name)}</span>
        ) : (
          <Link to="/login" className={styles.signInButton} tabIndex="0">
            Sign In
          </Link>
        )}
        <Link to="/workspace" className={styles.createButton} tabIndex="0">
          Create a FormBot
        </Link>
      </nav>
    </header>
  );
};
