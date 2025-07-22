import { LayoutContainer } from "@/components/layout/Container";
import { usePostStore } from "@/stores/usePostStore";
import { Heart } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
   const { getPosts, posts } = usePostStore();
   const navigate = useNavigate();

   useEffect(() => {
      getPosts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <LayoutContainer className="columns-2 md:columns-4 lg:columns-5 gap-4 space-y-4 min-h-screen">
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
   );
};
