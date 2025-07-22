import { Button } from "@/components/ui/button";
import { LayoutContainer } from "@/components/layout/Container";
import { useFormatDate } from "@/hooks/useFormatDate";
import { User, Mail, Calendar, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { usePublicStore } from "@/stores/usePublicStore";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

// PENDING:
// HOW TO HANDLE THE ADMIN PROFILE, CAUSE HE SHOULD NOT GET ANY DONATION, SO WE SHOULD
// IGNORE THAT SPECIFIC PROFILE ALONE

export const Profile = () => {
   const { isLoading, userProfile, notFound, getUser } = usePublicStore();
   const { user, logout } = useAuthStore();
   const { username } = useParams();

   const createdAt = useFormatDate(userProfile?.createdAt);
   const shortUserName = userProfile?.name.slice(0, 1);
   const isMyProfile = user?.username === username;

   const navigate = useNavigate();

   useEffect(() => {
      if (username) {
         getUser(username);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [username]);

   if (isLoading) {
      return (
         <LayoutContainer>
            <div className="flex items-center justify-center min-h-64">
               <div className="text-gray-500">Cargando...</div>
            </div>
         </LayoutContainer>
      );
   }

   if (notFound) {
      return <Navigate to="/404" />;
   }

   return (
      <LayoutContainer size="medium">
         {isMyProfile ? (
            <div className="mb-8">
               <h1 className="text-3xl font-bold mb-2">Mi perfil</h1>
               <p className="text-muted-foreground">Gestiona tu información personal</p>
            </div>
         ) : (
            <div className="mb-8">
               <h1 className="text-3xl font-bold mb-2">Perfil</h1>
               <p className="text-muted-foreground">
                  Puedes colaborar con donaciones a los aprendices:
               </p>
               <Button className="my-4">Donaciones aqui</Button>
            </div>
         )}

         <div className="bg-accent/50 rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center mb-6">
               <div className="w-16 h-16 bg-blue-200/80 rounded-full flex items-center justify-center">
                  <Avatar className="cursor-pointer pb-1">
                     <AvatarImage src="" />
                     <AvatarFallback className="text-4xl text-blue-600">
                        {shortUserName}
                     </AvatarFallback>
                  </Avatar>
               </div>
               <div className="ml-4">
                  <h2 className="text-xl font-semibold ">{userProfile?.name}</h2>
                  <p className="text-muted-foreground">Usuario activo</p>
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center p-3 border bg-accent/50 rounded-lg">
                  <User className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                     <label className="text-sm font-medium">Nombre completo</label>
                     <p className="text-muted-foreground">{userProfile?.name}</p>
                  </div>
               </div>

               <div className="flex items-center p-3 border bg-accent/50 rounded-lg">
                  <Mail className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                     <label className="text-sm font-medium">Correo electrónico</label>
                     <p className="text-muted-foreground">{userProfile?.email}</p>
                  </div>
               </div>

               <div className="flex items-center p-3 border bg-accent/50 rounded-lg">
                  <Calendar className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                     <label className="text-sm font-medium">Miembro desde</label>
                     <p className="text-muted-foreground">{createdAt}</p>
                  </div>
               </div>
            </div>
         </div>

         {isMyProfile && (
            <div className="flex justify-end space-x-3">
               <Button variant="outline">
                  <User className="w-4 h-4 mr-2" />
                  Editar perfil
               </Button>
               <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => {
                     navigate("/");
                     logout();
                  }}
               >
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar sesión
               </Button>
            </div>
         )}
      </LayoutContainer>
   );
};
