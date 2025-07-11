import { images } from "@/data/images";

export const Home = () => {
   return (
      <>
         <div className="flex flex-wrap gap-3 p-10">
            {images.map((img, i) => (
               <img className="w-25 h-17" key={i} src={img} alt={`image+${img}`} />
            ))}
         </div>
      </>
   );
};
