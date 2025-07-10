import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";

export const Dashboard = () => {
   const { user, logout } = useAuthStore();

   if (!user) {
      return <div>Cargando...</div>;
   }

   return (
      <>
         <h1 className="text-xl">Admin page</h1>
         <div>id: {user.id}</div>
         <div>name: {user.name}</div>
         <div>email: {user.email}</div>
         <div>role: {user.role}</div>
         <div>created at: {user.createdAt}</div>
         <Button variant={"destructive"} onClick={() => logout()}>
            Logout
         </Button>
      </>
   );
};
