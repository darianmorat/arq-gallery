import { PencilLine, Plus, Trash, Hash } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { useDashStore } from "@/stores/useDashStore";
import { CreateCategoryModal } from "./CreateCategoryModal";
import { DeleteCategoryModal } from "./DeleteCategoryModal";

type Category = {
   id: string;
   tag: string;
};

export const Categories = () => {
   const [showModal, setShowModal] = useState({ active: false, for: "" });
   const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
   const { categories = [], getCategories } = useDashStore();

   const handleModal = (modal: string): void => {
      setShowModal((prev) => ({ active: !prev.active, for: modal }));
   };

   useEffect(() => {
      getCategories();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <>
         <div className="flex gap-4 justify-between items-center">
            <div className="flex gap-8">
               <div>
                  <p className="text-3xl font-bold">
                     {categories.length.toString().padStart(2, "0")}
                  </p>
                  <h1>Total categorias</h1>
               </div>
               {/* <div> */}
               {/*    <p className="text-3xl font-bold">0</p> */}
               {/*    <h1>Categorias activas</h1> */}
               {/* </div> */}
            </div>
            <Button onClick={() => handleModal("create")}>
               <Plus /> Crear categoria
            </Button>
         </div>
         <Separator className="my-8" />
         <div className="overflow-x-auto rounded-sm border-1">
            <table className="min-w-full text-left">
               <thead className="bg-accent uppercase text-xs">
                  <tr>
                     <th className="px-6 py-3 min-w-fit">Categoria</th>
                     <th className="px-6 py-3 min-w-fit">Tag</th>
                     <th className="px-6 py-3 min-w-65 text-right">Acciones</th>
                  </tr>
               </thead>
               <tbody className="divide-y">
                  {categories.length === 0 && (
                     <tr>
                        <td colSpan={3} className="text-center py-6">
                           No hay categorias para mostrar
                        </td>
                     </tr>
                  )}

                  {categories.map((category) => (
                     <tr key={category.id}>
                        <td className="px-6 py-4">
                           <div className="font-medium">{category.title}</div>
                           <div className="text-sm text-gray-500 max-w-sm truncate">
                              {category.description}
                           </div>
                        </td>
                        <td className="px-6 py-6 flex items-center gap-2">
                           <span className="bg-accent text-sm font-medium px-2.5 py-2 rounded flex gap-1">
                              <Hash className="h-5" />
                              {category.tag}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                           <Button variant="outline">
                              <PencilLine /> Editar
                           </Button>
                           <Button
                              variant="outline"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => {
                                 handleModal("delete");
                                 setSelectedCategory(category);
                              }}
                           >
                              <Trash /> Eliminar
                           </Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>

         {showModal.active && showModal.for === "create" && (
            <CreateCategoryModal handleModal={() => handleModal("")} />
         )}
         {showModal.active && showModal.for === "delete" && selectedCategory && (
            <DeleteCategoryModal
               handleModal={() => handleModal("")}
               category={selectedCategory}
            />
         )}
      </>
   );
};
