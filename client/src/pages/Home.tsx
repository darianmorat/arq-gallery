import { LayoutContainer } from "@/components/layout/Container";
import { images } from "@/data/images";

export const Home = () => {
   return (
      <LayoutContainer className="columns-2 md:columns-4 lg:columns-5 gap-4 space-y-4">
         {images.map((img, i) => (
            <img className="w-full rounded-lg" key={i} src={img} alt={`image+${img}`} />
         ))}
      </LayoutContainer>
   );
};
