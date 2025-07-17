import { PencilLine, Plus, Trash, Video, Image } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export const Categories = () => {
   return (
      <>
         <div className="flex gap-4 justify-between items-center">
            <div className="flex gap-8">
               <div>
                  <p className="text-3xl font-bold">06</p>
                  <h1>Total categorias</h1>
               </div>
               <div>
                  <p className="text-3xl font-bold">09</p>
                  <h1>Categorias activas</h1>
               </div>
            </div>
            <Button>
               <Plus /> Crear categoria
            </Button>
         </div>
         <Separator className="my-8" />
         <div className="overflow-x-auto rounded-sm border-1">
            <table className="min-w-full text-left">
               <thead className="bg-accent uppercase text-xs">
                  <tr>
                     <th className="px-6 py-3 min-w-fit">Categoria</th>
                     <th className="px-6 py-3 min-w-fit">Formato</th>
                     <th className="px-6 py-3 min-w-65 text-right">Acciones</th>
                  </tr>
               </thead>
               <tbody className="divide-y">
                  {[
                     {
                        name: "Web development",
                        description:
                           "Learn all the fundamentals of coding in this section which is gonna be pretty long cause is that description for that",
                        format: "image",
                     },
                     {
                        name: "Another categorie",
                        description:
                           "This is another description of the fundamentals of what we are gonna use in this especific section of the coding",
                        format: "video",
                     },
                     {
                        name: "Web development",
                        description:
                           "Learn all the fundamentals of coding in this section which is gonna be pretty long cause is that description for that",
                        format: "image",
                     },
                     {
                        name: "Web development",
                        description:
                           "Learn all the fundamentals of coding in this section which is gonna be pretty long cause is that description for that",
                        format: "image",
                     },
                     {
                        name: "Web development",
                        description:
                           "Learn all the fundamentals of coding in this section which is gonna be pretty long cause is that description for that",
                        format: "image",
                     },
                  ].map((category, idx) => (
                     <tr key={idx}>
                        <td className="px-6 py-4">
                           <div className="font-medium">{category.name}</div>
                           <div className="text-sm text-gray-500 max-w-sm truncate">
                              {category.description}
                           </div>
                        </td>
                        <td className="px-6 py-6 flex items-center gap-2">
                           <span className="bg-accent text-sm font-medium px-2.5 py-2 rounded flex gap-2">
                              {category.format === "video" ? (
                                 <Video className="h-5" />
                              ) : (
                                 <Image className="h-5" />
                              )}
                              {category.format}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                           <Button variant="outline">
                              <PencilLine /> Editar
                           </Button>
                           <Button
                              variant="outline"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                           >
                              <Trash /> Eliminar
                           </Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </>
   );
};
