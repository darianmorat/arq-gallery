import { Button } from "@/components/ui/button";
import { LayoutContainer } from "@/components/layout/Container";
import { User, Calendar, Heart, Share2, Download, DollarSign } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
import { usePublicStore } from "@/stores/usePublicStore";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useFormatDate } from "@/hooks/useFormatDate";

export const Post = () => {
   const { isLoading, notFound, getPost, postProfile } = usePublicStore();
   const { user } = useAuthStore();
   const { post } = useParams();

   const isMyPost = user?.username === post;
   const createdAt = useFormatDate(postProfile?.createdAt);

   useEffect(() => {
      if (post) {
         getPost(post);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [post]);

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
         <div className="dark:bg-accent/80 rounded-xl shadow overflow-hidden border">
            <div className="relative flex justify-center bg-black dark:bg-background">
               <img
                  src={postProfile?.mediaUrl}
                  alt={postProfile?.title}
                  className="max-w-full h-auto max-h-[450px] object-contain"
               />
            </div>
            <div className="p-8">
               <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                  <div>
                     <div className="border-l-4 border-black dark:border-white pl-3">
                        <p className="font-semibold">Author Name</p>
                        <p className="text-sm text-muted-foreground">Autor</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-2">
                     <Heart
                        size={35}
                        className="text-gray-600 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg"
                     />

                     <Share2
                        size={35}
                        className="text-gray-600 hover:text-blue-500 hover:bg-blue-50 p-2 rounded-lg"
                     />

                     <Download
                        size={35}
                        className="text-gray-600 hover:text-green-500 hover:bg-green-50 p-2 rounded-lg"
                     />

                     {!isMyPost && (
                        <>
                           <DollarSign
                              size={35}
                              className="text-gray-600 hover:text-yellow-500 hover:bg-yellow-50 p-2 rounded-lg"
                           />
                           <Button variant={"outline"}>Ver perfil</Button>
                        </>
                     )}

                     {isMyPost && (
                        <div>
                           <Button>Editar publicación</Button>
                        </div>
                     )}
                  </div>
               </div>

               <h1 className="text-3xl font-bold mb-6 leading-tight">
                  {postProfile?.title}
               </h1>

               <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-4 p-4 rounded-lg border">
                     <User className="w-5 h-5 mt-1 flex-shrink-0" />
                     <div className="flex-1">
                        <label className="text-sm font-medium text-muted-foreground block mb-1">
                           Descripción
                        </label>
                        <p className="text-muted-foreground/70">
                           {postProfile?.description}
                        </p>
                     </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg border">
                     <Calendar className="w-5 h-5 flex-shrink-0" />
                     <div className="flex-1">
                        <label className="text-sm font-medium text-muted-foreground block mb-1">
                           Fecha de publicación
                        </label>
                        <p className="text-muted-foreground/70">{createdAt}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* <div className="dark:bg-accent/80 rounded-xl shadow overflow-hidden border mt-4 p-4"> */}
         {/*    Informacion de categoria */}
         {/*    <p>{postProfile?.categoryId}</p> */}
         {/* </div> */}
      </LayoutContainer>
   );
};
