import { Button } from "../../ui/button";
import { X } from "lucide-react";
import { Modal } from "../Modal";
import { useDashStore } from "@/stores/useDashStore";

type Category = {
   id: string;
   tag: string;
};

type DeleteCategoryModalProps = {
   handleModal: () => void;
   category: Category;
};

export const DeleteCategoryModal = ({
   handleModal,
   category,
}: DeleteCategoryModalProps) => {
   const { deleteCategory } = useDashStore();

   return (
      <Modal>
         <div className="relative bg-background dark:bg-accent p-6 rounded-lg m-4 w-full max-w-100 flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Eliminar categoría</h1>
            <p className="text-muted-foreground text-sm">
               Confirma que quiere eliminar la categoría{" "}
               <span className="font-bold">{category.tag}</span>?
            </p>
            <Button
               type="button"
               variant={"ghost"}
               className="absolute right-2 top-2 text-muted-foreground"
               onClick={handleModal}
            >
               <X />
            </Button>
            <div className="flex gap-2 pt-2">
               <Button
                  variant={"default"}
                  type="submit"
                  onClick={() => {
                     deleteCategory(category.id);
                     handleModal();
                  }}
                  // disabled={isLoading}
                  className="grow"
               >
                  Aceptar
               </Button>
               <Button
                  type="button"
                  variant={"outline"}
                  onClick={handleModal}
                  // disabled={isLoading}
                  className="grow"
               >
                  Cancelar
               </Button>
            </div>
         </div>
      </Modal>
   );
};
