import { Button } from "@/components/ui/button";
import { useFormatDate } from "@/hooks/useFormatDate";
import { useAuthStore } from "@/stores/useAuthStore";

export const Dashboard = () => {
   const { user, logout } = useAuthStore();
   const createdAt = useFormatDate(user?.createdAt);

   if (!user) {
      return <div>Cargando...</div>;
   }

   return (
      <>
         <h1 className="text-xl">Admin page</h1>
         <div>name: {user.name}</div>
         <div>email: {user.email}</div>
         <div>role: {user.role}</div>
         <div>created at: {createdAt}</div>
         <Button variant={"destructive"} onClick={() => logout()}>
            Logout
         </Button>
      </>
   );
};
