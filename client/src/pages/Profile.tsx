import { Button } from "@/components/ui/button";
import { LayoutContainer } from "@/components/layout/Container";
import { useFormatDate } from "@/hooks/useFormatDate";
import { useAuthStore } from "@/stores/useAuthStore";
import { User, Mail, Calendar, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export const Profile = () => {
   const { user, logout } = useAuthStore();
   const createdAt = useFormatDate(user?.createdAt);
   const shortUserName = user?.name.slice(0, 1);

   if (!user) {
      return (
         <LayoutContainer>
            <div className="flex items-center justify-center min-h-64">
               <div className="text-gray-500">Cargando...</div>
            </div>
         </LayoutContainer>
      );
   }

   return (
      <LayoutContainer size="medium">
         {/* Header */}
         <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Mi perfil</h1>
            <p className="text-muted-foreground">Gestiona tu información personal</p>
         </div>

         {/* Profile Card */}
         <div className="bg-accent/50 rounded-lg shadow-sm p-6 mb-6">
            {/* Avatar Section */}
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
                  <h2 className="text-xl font-semibold ">{user.name}</h2>
                  <p className="text-muted-foreground">Usuario activo</p>
               </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-4">
               <div className="flex items-center p-3 border bg-accent/50 rounded-lg">
                  <User className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                     <label className="text-sm font-medium">Nombre completo</label>
                     <p className="text-muted-foreground">{user.name}</p>
                  </div>
               </div>

               <div className="flex items-center p-3 border bg-accent/50 rounded-lg">
                  <Mail className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                     <label className="text-sm font-medium">Correo electrónico</label>
                     <p className="text-muted-foreground">{user.email}</p>
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

         {/* Actions */}
         <div className="flex justify-end space-x-3">
            <Button variant="outline" className="flex items-center">
               <User className="w-4 h-4 mr-2" />
               Editar perfil
            </Button>
            <Button
               variant="destructive"
               onClick={() => logout()}
               className="flex items-center"
            >
               <LogOut className="w-4 h-4 mr-2" />
               Cerrar sesión
            </Button>
         </div>
      </LayoutContainer>
   );
};
