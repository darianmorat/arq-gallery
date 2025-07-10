import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";

export const Profile = () => {
   const { user, logout } = useAuthStore();

   const createdAtDate = (date: string) => {
      return new Date(date).toLocaleDateString("en-US", {
         year: "numeric",
         month: "long",
         day: "numeric",
      });
   };

   if (!user) {
      return <div>Cargando...</div>;
   }

   return (
      <>
         <div>name: {user.name}</div>
         <div>email: {user.email}</div>
         <div>created at: {createdAtDate(user.createdAt)}</div>
         <Button variant={"destructive"} onClick={() => logout()}>
            Logout
         </Button>
      </>
   );
};
