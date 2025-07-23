import { Button } from "@/components/ui/button";
import { LayoutContainer } from "@/components/layout/Container";
import { useFormatDate } from "@/hooks/useFormatDate";
import { User, Mail, Calendar, LogOut, Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { usePublicStore } from "@/stores/usePublicStore";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePostStore } from "@/stores/usePostStore";

// PENDING:
// HOW TO HANDLE THE ADMIN PROFILE, CAUSE HE SHOULD NOT GET ANY DONATION, SO WE SHOULD
// IGNORE THAT SPECIFIC PROFILE ALONE

export const Profile = () => {
   const { isLoading, userProfile, notFound, getUser } = usePublicStore();
   const { posts, getUserPosts } = usePostStore();
   const { user, logout } = useAuthStore();
   const { username } = useParams();

   const phone = userProfile?.phone;
   const message = "Hola, me gustaría apoyarte con una donación!";
   const url = `https://wa.me/57${phone}?text=${encodeURIComponent(message)}`;

   const createdAt = useFormatDate(userProfile?.createdAt);
   const shortUserName = userProfile?.name.slice(0, 1);
   const isMyProfile = user?.username === username;

   const navigate = useNavigate();

   useEffect(() => {
      if (username) {
         getUser(username);
         getUserPosts(username);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [username]);

   if (isLoading) {
      return (
         <LayoutContainer>
            <div className="flex items-center justify-center h-screen mt-[-50px]">
               <div className="text-gray-500">Cargando perfil...</div>
            </div>
         </LayoutContainer>
      );
   }

   if (notFound) {
      return <Navigate to="/404" />;
   }

   return (
      <LayoutContainer size="medium" className="my-4">
         {isMyProfile && (
            <div className="mb-8">
               <h1 className="text-3xl font-bold mb-2">Mi perfil</h1>
               <p className="text-muted-foreground">Gestiona tu información personal</p>
            </div>
         )}
         <div className="rounded-lg border p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center">
               <div className="flex items-center">
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

               {isMyProfile ? (
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
               ) : (
                  <Button
                     variant={"outline"}
                     className="my-4"
                     onClick={() => window.open(url, "_blank")}
                  >
                     Donaciones aqui
                  </Button>
               )}
            </div>

            <div className="space-y-4">
               <div className="flex items-center p-3 border bg-accent/30 rounded-lg">
                  <User className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                     <label className="text-sm font-medium">Nombre completo</label>
                     <p className="text-muted-foreground">{userProfile?.name}</p>
                  </div>
               </div>

               <div className="flex items-center p-3 border bg-accent/30 rounded-lg">
                  <Mail className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                     <label className="text-sm font-medium">Número celular</label>
                     <p className="text-muted-foreground">#{userProfile?.phone}</p>
                  </div>
               </div>

               <div className="flex items-center p-3 border bg-accent/30 rounded-lg">
                  <Mail className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                     <label className="text-sm font-medium">Correo electrónico</label>
                     <p className="text-muted-foreground">{userProfile?.email}</p>
                  </div>
               </div>

               <div className="flex items-center p-3 border bg-accent/30 rounded-lg">
                  <Calendar className="w-5 h-5 text-muted-foreground mr-3" />
                  <div>
                     <label className="text-sm font-medium">Miembro desde</label>
                     <p className="text-muted-foreground">{createdAt}</p>
                  </div>
               </div>
            </div>
         </div>
         <div className="rounded-lg py-6 flex flex-col gap-4 mt-4">
            <h2 className="text-2xl font-semibold">Publicaciones ({posts.length})</h2>
            {posts.length <= 0 ? (
               <p>Opps! Parece que no hay nada para mostrar</p>
            ) : (
               <LayoutContainer className="columns-2 p-0 md:columns-3 lg:columns-4 gap-4 space-y-4 min-h-screen">
                  {posts.map((post, i) => (
                     <div
                        key={i}
                        className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                        onClick={() => navigate(`/post/${post.publicId}`)}
                     >
                        <img
                           className="w-full rounded-lg transition-all duration-200 group-hover:brightness-85"
                           src={post.mediaUrl}
                           alt={post.title}
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg [background:radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.2)_70%,rgba(0,0,0,0.5)_100%)]" />

                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                           <button className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-lg shadow-lg backdrop-blur-sm">
                              <Heart className="w-4 h-4" />
                           </button>
                        </div>

                        <div className="absolute bottom-0 left-0 p-2 bg-black/50 w-full text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                           {post.title}
                        </div>
                     </div>
                  ))}
               </LayoutContainer>
            )}
         </div>
      </LayoutContainer>
   );
};
