import { breadFig, curveFig, heroImg } from "../../assets";
import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroGroupContent}>
        <img className={styles.fig1} src={breadFig} alt="breadFig" />
        <img className={styles.fig2} src={curveFig} alt="curveFig" />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Build advanced chatbots
            <br />
            visually
          </h1>
          <p className={styles.heroDescription}>
            Typebot gives you powerful blocks to create unique chat experiences.
            Embed them
            <br />
            anywhere on your web/mobile apps and start collecting results like
            magic.
          </p>
          <a href="/create" className={styles.ctaButton} tabIndex="0">
            Create a FormBot for free
          </a>
        </div>
      </div>
      <div className={styles.heroImageContainer}>
        <div className={`${styles.orangeBlob} ${styles.blob}`}></div>
        <div className={`${styles.blueBlob} ${styles.blob}`}></div>
        <img
          loading="lazy"
          src={heroImg}
          className={styles.heroImage}
          alt="FormBot Builder Interface"
        />
      </div>
    </section>
  );
};
