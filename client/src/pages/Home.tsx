import { Button } from "@/components/ui/button";
import { images } from "@/data/images";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export const Home = () => {
   const { isAuth } = useAuthStore();
   const isAdmin = useIsAdmin();
   const navigate = useNavigate();

   return (
      <>
         {isAuth && isAdmin && <Button onClick={() => navigate("/admin")}>Admin</Button>}
         {isAuth && <Button onClick={() => navigate("/profile")}>Profile</Button>}
         {!isAuth && <Button onClick={() => navigate("/login")}>Login</Button>}

         <div className="flex flex-wrap gap-3 p-10">
            {images.map((img, i) => (
               <img className="w-25 h-17" key={i} src={img} alt={`image+${img}`} />
            ))}
         </div>
      </>
   );
};
