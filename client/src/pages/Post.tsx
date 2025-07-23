import { Button } from "@/components/ui/button";
import { LayoutContainer } from "@/components/layout/Container";
import { User, Calendar, Heart, Share2, Download, DollarSign, Tag } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { usePublicStore } from "@/stores/usePublicStore";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useFormatDate } from "@/hooks/useFormatDate";

export const Post = () => {
   const { isLoading, notFound, postProfile, getPost } = usePublicStore();
   const { user } = useAuthStore();
   const { post } = useParams();

   const navigate = useNavigate();

   const phone = postProfile?.author.phone;
   const message = "Hola, me gustaría apoyarte con una donación!";
   const url = `https://wa.me/57${phone}?text=${encodeURIComponent(message)}`;

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
            <div className="flex items-center justify-center h-screen mt-[-50px]">
               <div className="text-gray-500">Cargando post...</div>
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
                        <p className="font-semibold">{postProfile?.author.name}</p>
                        <p className="text-sm text-muted-foreground">Autor</p>
                     </div>
                  </div>

                  <div className="flex items-center gap-2">
                     <Heart
                        size={35}
                        className="text-gray-600 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg cursor-pointer"
                     />

                     <Share2
                        size={35}
                        className="text-gray-600 hover:text-blue-500 hover:bg-blue-50 p-2 rounded-lg cursor-pointer"
                     />

                     <Download
                        size={35}
                        className="text-gray-600 hover:text-green-500 hover:bg-green-50 p-2 rounded-lg cursor-pointer"
                     />

                     {!isMyPost && (
                        <>
                           <DollarSign
                              size={35}
                              className="text-gray-600 hover:text-yellow-500 hover:bg-yellow-50 p-2 rounded-lg cursor-pointer"
                              onClick={() => window.open(url, "_blank")}
                           />
                           <Button
                              variant={"outline"}
                              onClick={() => navigate(`/${postProfile?.author.username}`)}
                           >
                              Ver perfil
                           </Button>
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
         <div className="dark:bg-accent/80 rounded-xl shadow overflow-hidden border mt-4">
            <div className="p-8">
               <div className="flex bg-blue-50 dark:bg-blue-200/10 items-start gap-4 p-4 rounded-lg border border-blue-200 dark:border-blue-200/50">
                  <Tag className="w-5 h-5 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                     <p className="text-muted-foreground mb-2">
                        #{postProfile?.category.tag}
                     </p>
                     <h3 className="text-lg font-semibold mb-1">
                        {postProfile?.category.title}
                     </h3>
                     <p className="text-muted-foreground/70">
                        {postProfile?.category.description}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </LayoutContainer>
   );
};
