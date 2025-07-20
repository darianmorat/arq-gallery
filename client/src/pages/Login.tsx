import { LoginForm } from "@/components/auth/login-form";
import { useNavigate } from "react-router-dom";

export const Login = () => {
   const navigate = useNavigate();

   return (
      <div className="grid min-h-svh lg:grid-cols-2">
         <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex justify-center gap-2 md:justify-start">
               <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 size-10 cursor-pointer"
                  alt="Flowbite Logo"
                  onClick={() => navigate("/")}
               />
               <span
                  className="self-center font-semibold whitespace-nowrap dark:text-white cursor-pointer"
                  onClick={() => navigate("/")}
               >
                  Arq Gallery
               </span>
            </div>
            <div className="flex flex-1 items-center justify-center">
               <div className="w-full max-w-xs">
                  <LoginForm />
               </div>
            </div>
         </div>
         <div className="bg-muted relative hidden lg:block">
            <img
               src="https://images.unsplash.com/photo-1502082553048-f009c37129b9"
               alt="Image"
               className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.25] dark:grayscale"
            />
         </div>
      </div>
   );
};
