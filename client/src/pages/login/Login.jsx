import Button from "../../components/button/Button";
import styles from "./Login.module.css";

export const Login = () => {
   return (
      <div className={styles.login}>
         <div className={styles.container}>
            <h1>Login</h1>
            <form className={styles.form}>
               <div>
                  <label for="">Email:</label>
                  <input type="email" name="email" />
               </div>
               <div>
                  <label for="">Password:</label>
                  <input type="text" name="password" />
               </div>
               <Button type="submit">Submit</Button>
            </form>
         </div>
      </div>
   );
};
