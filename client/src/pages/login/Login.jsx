import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import styles from "./Login.module.css";

export const Login = () => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const onSubmit = async (data) => {
      console.log(data);
      reset();
   };

   return (
      <div className={styles.login}>
         <div className={styles.container}>
            <h1>Login</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
               <div>
                  <label htmlFor="email">Email:</label>
                  <input
                     type="email"
                     name="email"
                     autoFocus
                     {...register("email", {
                        required: "* Campo obligatorio",
                        pattern: {
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                           message: "Email invalido",
                        },
                     })}
                  />
                  {errors.email && errors.email.message}
               </div>
               <div>
                  <label htmlFor="password">Password:</label>
                  <input
                     type="text"
                     name="password"
                     {...register("password", {
                        required: "* Campo obligatorio",
                     })}
                  />
                  {errors.password && errors.password.message}
               </div>
               <Button>Submit</Button>
            </form>
         </div>
      </div>
   );
};
