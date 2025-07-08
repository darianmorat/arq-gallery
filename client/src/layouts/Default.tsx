import { Navbar } from "@/components/common/Navbar";
import { Outlet } from "react-router-dom";

export const Default = () => {
   return (
      <>
         <Navbar />
         <Outlet />
      </>
   );
};
