import { useNavigate } from "react-router-dom";
import { Separator } from "../ui/separator";

export const Footer = () => {
   const navigate = useNavigate();

   return (
      <footer className="border-t mt-8 bg-zinc-100 dark:bg-zinc-900">
         <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
               <a
                  href="#"
                  onClick={() => navigate("/")}
                  className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
               >
                  <img
                     src="https://flowbite.com/docs/images/logo.svg"
                     className="h-8"
                     alt="Flowbite Logo"
                  />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                     Arq Gallery
                  </span>
               </a>
               <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                  <li>
                     <a href="#" className="hover:underline me-4 md:me-6">
                        About
                     </a>
                  </li>
                  <li>
                     <a href="#" className="hover:underline me-4 md:me-6">
                        Privacy Policy
                     </a>
                  </li>
                  <li>
                     <a href="#" className="hover:underline me-4 md:me-6">
                        Licensing
                     </a>
                  </li>
                  <li>
                     <a href="#" className="hover:underline">
                        Contact
                     </a>
                  </li>
               </ul>
            </div>
            <Separator className="my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
               © 2025{" "}
               <a href="https://flowbite.com/" className="hover:underline">
                  Arq Gallery™
               </a>
               . Todos los derechos reservados.
            </span>
         </div>
      </footer>
   );
};
