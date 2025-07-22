import { LayoutContainer } from "@/components/layout/Container";
import { usePostStore } from "@/stores/usePostStore";
import { Download, Heart } from "lucide-react";
import { useEffect } from "react";

export const Home = () => {
   const { getImages, images } = usePostStore();

   useEffect(() => {
      getImages();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <LayoutContainer className="columns-2 md:columns-4 lg:columns-5 gap-4 space-y-4 min-h-screen">
         {/* {Array(3) */}
         {/*    .fill(images) */}
         {/*    .flat() */}
         {/*    .map((img, i) => ( */}

         {images.map((img, i) => (
            <div
               key={i}
               className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
            >
               <img
                  className="w-full rounded-lg transition-all duration-200 group-hover:brightness-85"
                  src={img.mediaUrl}
                  alt={`image+${img.id}`}
               />
               <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg [background:radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.2)_70%,rgba(0,0,0,0.5)_100%)]" />

               <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-lg shadow-lg backdrop-blur-sm">
                     <Heart className="w-4 h-4" />
                  </button>
               </div>
               <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-lg shadow-lg backdrop-blur-sm">
                     <Download className="w-4 h-4" />
                  </button>
               </div>
            </div>
         ))}
      </LayoutContainer>
   );
};
