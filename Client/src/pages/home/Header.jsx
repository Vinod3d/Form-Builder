import { Link } from 'react-router-dom';
import { logo } from '../../assets';
import styles from './Header.module.css';

export const Header = () => {
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
        <Link to="/login" className={styles.signInButton} tabIndex="0">Sign in</Link>
        <Link to="/create" className={styles.createButton} tabIndex="0">Create a FormBot</Link>
      </nav>
    </header>
  );
};