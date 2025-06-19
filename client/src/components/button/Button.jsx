import styles from "./Button.module.css";

const Button = ({ children, variant }) => {
   return <button className={`${styles.btn} ${styles[variant]}`}>{children}</button>;
};

export default Button;
