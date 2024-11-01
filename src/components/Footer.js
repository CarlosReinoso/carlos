import styles from "./Footer.module.css"; // Import the CSS module

export default function Footer() {
  return (
    <footer className={`text-center text-white my-5 ${styles.footerText}`}>
      Website by{" "}
      <a
        href="mailto:carlosrwebs@gmail.com"
        className={styles.underlineAnimation} // Use the imported styles
      >
        Carlos Reinoso
      </a>
    </footer>
  );
}
