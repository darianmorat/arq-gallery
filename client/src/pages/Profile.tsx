import { Button } from "@/components/ui/button";
import { useFormatDate } from "@/hooks/useFormatDate";
import { useAuthStore } from "@/stores/useAuthStore";

export const Profile = () => {
   const { user, logout } = useAuthStore();
   const createdAt = useFormatDate(user?.createdAt);

   if (!user) {
      return <div>Cargando...</div>;
   }

   return (
      <>
         <div>name: {user.name}</div>
         <div>email: {user.email}</div>
         <div>created at: {createdAt}</div>
         <Button variant={"destructive"} onClick={() => logout()}>
            Logout
         </Button>
      </>
   );
};
