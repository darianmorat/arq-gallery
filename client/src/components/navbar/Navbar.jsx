import { ThemeChanger } from "../themeChanger/ThemeChanger";
import styles from "./Navbar.module.css";

export const Navbar = () => {
   return (
      <nav className={styles.nav}>
         <div className={styles.container}>
            <p>Logo Here</p>
            <div className={styles.navRight}>
               <input type="search" name="search" placeholder="search..." />
               <ThemeChanger />
            </div>
         </div>
      </nav>
   );
};
