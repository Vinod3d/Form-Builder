/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from './Tabs.module.css';

export function Tabs({children }) {
  return <div>{children}</div>;
}

export function TabsList({ children}) {
  return <div className={`${styles.tabsList}`}>{children}</div>;
}

export function TabsTrigger({isDark, value, children, isActive, onClick }) {
  return (
    <button
      className={`${styles.tabsTrigger} ${isActive ? styles.active : ''}  ${isDark ? styles.dark : styles.light}`}
      onClick={() => onClick(value)}
      
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, activeTab, children, className }) {
  return <div className={className} style={{ display: value === activeTab ? 'block' : 'none' }}>{children}</div>;
}
