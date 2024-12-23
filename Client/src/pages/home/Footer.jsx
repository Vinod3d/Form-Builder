/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { logo } from '../../assets';
import styles from './Footer.module.css';

const footerLinks = {
  product: [
    { label: 'Status', href: '/status' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Roadmap', href: '/roadmap' },
    { label: 'Pricing', href: '/pricing' }
  ],
  community: [
    { label: 'Discord', href: '/discord' },
    { label: 'GitHub repository', href: '/github' },
    { label: 'Twitter', href: '/twitter' },
    { label: 'LinkedIn', href: '/linkedin' },
    { label: 'OSS Friends', href: '/oss-friends' }
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' }
  ]
};

const FooterColumn = ({ title, links }) => (
  <div className={styles.footerColumn}>
    <h2 className={styles.columnTitle}>{title}</h2>
    {links.map((link, index) => (
      <Link key={index} href={link.href} className={styles.footerLink} tabIndex="0">
        {link.label}
      </Link>
    ))}
  </div>
);

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brandSection}>
          <div className={styles.brandContainer}>
            <img
              loading="lazy"
              src={logo}
              className={styles.footerLogo}
              alt="FormBot Footer Logo"
            />
            <span className={styles.brandName}>FormBot</span>
          </div>
          <p className={styles.brandDescription}>
            Made with ❤️ by
            <br />
            <Link href="#" className={styles.authorLink}>@cuvette</Link>
          </p>
        </div>
        
        <FooterColumn title="Product" links={footerLinks.product} />
        <FooterColumn title="Community" links={footerLinks.community} />
        <FooterColumn title="Company" links={footerLinks.company} />
      </div>
    </footer>
  );
};