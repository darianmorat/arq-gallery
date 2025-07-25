import { Button } from "@/components/ui/button";
import { LayoutContainer } from "@/components/layout/Container";
import {
   User,
   Calendar,
   Heart,
   Share2,
   Download,
   DollarSign,
   Tag,
   Fullscreen,
} from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useFormatDate } from "@/hooks/useFormatDate";
import { DeletePostModal } from "@/components/dashboard/DeletePostModal";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { usePostStore } from "@/stores/usePostStore";

type Post = {
   id: string;
   title: string;
   publicId: string;
};

export const Post = () => {
   const { isLoading, notFound, postProfile, getPost } = usePostStore();
   const [selectedPost, setSelectedPost] = useState<Post | null>(null);
   const [showModal, setShowModal] = useState({ active: false, for: "" });
   const isAdmin = useIsAdmin();
   const { user } = useAuthStore();
   const { post } = useParams();

   const navigate = useNavigate();

   const phone = postProfile?.author.phone;
   const message = "Hola, me gustaría apoyarte con una donación!";
   const url = `https://wa.me/57${phone}?text=${encodeURIComponent(message)}`;

   const isMyPost = user?.username === postProfile?.author.username;
   const createdAt = useFormatDate(postProfile?.createdAt);
   const imageRef = useRef<HTMLImageElement>(null);

   const handleModal = (modal: string): void => {
      setShowModal((prev) => ({ active: !prev.active, for: modal }));
   };

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

   const handleFullscreen = () => {
      const img = imageRef.current;

      if (img?.requestFullscreen) {
         img.requestFullscreen();
      }
   };

   return (
      <>
         <LayoutContainer size="medium">
            <div className="dark:bg-accent/80 rounded-xl shadow overflow-hidden border">
               <div className="relative flex justify-center bg-black dark:bg-background">
                  <img
                     ref={imageRef}
                     src={postProfile?.mediaUrl}
                     alt={postProfile?.title}
                     className="max-w-full h-auto max-h-[450px] object-contain"
                  />
                  <Fullscreen
                     size={35}
                     onClick={handleFullscreen}
                     className="absolute bottom-2 right-2 bg-black/30 hover:bg-black/40 rounded-md p-1 group-hover:opacity-100 transition-opacity text-white cursor-pointer"
                  />
               </div>
               <div className="p-8 border-t">
                  <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
                     <div className="flex-1 min-w-fit">
                        <div className="border-l-4 border-black dark:border-white pl-3">
                           <p className="font-semibold">{postProfile?.author.name}</p>
                           <p className="text-sm text-muted-foreground">Autor</p>
                        </div>
                     </div>

                     <div className="flex flex-1 justify-end gap-2">
                        <Heart
                           size={35}
                           className="text-gray-600 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg cursor-pointer border"
                        />

                        <Share2
                           size={35}
                           className="text-gray-600 hover:text-blue-500 hover:bg-blue-50 p-2 rounded-lg cursor-pointer border"
                        />

                        {!isMyPost && (
                           <>
                              <Download
                                 size={35}
                                 className="text-gray-600 hover:text-green-500 hover:bg-green-50 p-2 rounded-lg cursor-pointer border"
                              />

                              <DollarSign
                                 size={35}
                                 className="text-gray-600 hover:text-yellow-500 hover:bg-yellow-50 p-2 rounded-lg cursor-pointer border"
                                 onClick={() => window.open(url, "_blank")}
                              />
                           </>
                        )}
                     </div>

                     <div className="flex gap-2 flex-wrap justify-end w-full sm:w-fit">
                        {!isMyPost && (
                           <Button
                              variant={"outline"}
                              onClick={() => navigate(`/${postProfile?.author.username}`)}
                              className="flex-1"
                           >
                              Ver perfil
                           </Button>
                        )}

                        {isAdmin && (
                           <Button
                              variant={"outline"}
                              onClick={() => {
                                 handleModal("delete");
                                 setSelectedPost(postProfile);
                              }}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-1"
                           >
                              Eliminar post
                           </Button>
                        )}

                        {isMyPost && (
                           <Button className="flex-1">Editar publicación</Button>
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
                        {postProfile?.category ? (
                           <>
                              <p className="text-muted-foreground mb-2">
                                 #{postProfile?.category.tag}
                              </p>
                              <h3 className="text-lg font-semibold mb-1">
                                 {postProfile?.category.title}
                              </h3>
                              <p className="text-muted-foreground/70">
                                 {postProfile?.category.description}
                              </p>
                           </>
                        ) : (
                           <>
                              <p className="text-muted-foreground">Sin categoría</p>
                           </>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </LayoutContainer>

         {showModal.active && selectedPost && (
            <DeletePostModal handleModal={() => handleModal("")} post={selectedPost} />
         )}
      </>
   );
};
